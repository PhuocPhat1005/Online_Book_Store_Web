from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService, ReadService, UpdateService, DeleteService
# from app.services.photo_service import upload_photo
from app.services.crud_service import query_in_db_by_id
from app.schemas.photo import PhotoCreate, PhotoUpdate, PhotoResponse
from app.models.user_photo import UserPhoto
from app.models.review_photo import ReviewPhoto
from app.models.book_photo import BookPhoto
from app.schemas.book import BookUpdate
from app.database.database import get_db
from uuid import UUID
import uuid
import shutil
import os
from app.config.config import settings
from sqlalchemy import cast
import boto3
from fastapi.responses import JSONResponse
from app.models.book import Book
from app.models.user import User
from app.models.review import Review

router = APIRouter()
AWS_ACCESS_KEY_ID = settings.AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = settings.AWS_SECRET_ACCESS_KEY
AWS_REGION = settings.AWS_REGION
AWS_BUCKET_NAME = settings.AWS_BUCKET_NAME
AWS_LINK = settings.AWS_LINK

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

@router.post("/uploadfiles")
async def upload_files(id_: str, typee: str = 'Book', is_ava: int = 0, files: list[UploadFile] = File(...), db: AsyncSession = Depends(get_db)):
    try:
        folder_path = ""
        if typee == 'Book':
            book_read_service = ReadService(Book)
            book = await book_read_service.get_by_condition([{'id': id_}], db)
            folder_path = normalization(book[0].book_name) + '/'
        elif typee == 'User':
            # Handle User specific logic if needed
            pass
        elif typee == 'Review':
            # Handle Review specific logic if needed
            pass
        
        file_paths = []
        for file in files:
            name_photo = uuid.uuid4()
            extension = file.filename.split('.')[-1]
            key = f'{folder_path}{name_photo}.{extension}'
            
            s3_client.upload_fileobj(
                file.file,
                AWS_BUCKET_NAME,
                key,
                ExtraArgs={"ContentType": file.content_type},
            )
            path = AWS_LINK + key
            file_paths.append(path)
        
        if is_ava == 1 and typee == 'Book':
            book_update_service = UpdateService[Book, BookUpdate](Book)
            book_update = BookUpdate()
            book_update.book_ava = file_paths[0]  # Assuming the first file is used as the avatar
            await book_update_service.update(id_, book_update, db)
        
        # Add the uploaded file info to the database
        for path in file_paths:
            new_id = uuid.uuid4()
            if typee == "Book":
                photo = BookPhoto(id=new_id, book_id=id_, path=path)
            elif typee == "User":
                photo = UserPhoto(id=new_id, user_id=id_, path=path)
            elif typee == "Review":
                photo = ReviewPhoto(id=new_id, review_id=id_, path=path)
            else:
                continue
            
            db.add(photo)
        
        await db.commit()
        
        return JSONResponse(content={"message": "Files uploaded successfully"}, status_code=201)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

def normalization(name):
    name = name.lower()
    name = name.replace(' ', '-')
    return name

@router.get("/get_photo")
async def get_all_in_folder_endpoint(typee: str, id_: str, db: AsyncSession = Depends(get_db)):
    if typee == "Book":
        photo_read_service = ReadService(BookPhoto)
        photos = await photo_read_service.get_by_condition([{'book_id':id_}], db)
    if typee == "User":
        photo_read_service = ReadService(UserPhoto)
        photos = await photo_read_service.get_by_condition([{'user_id':id_}], db)
    if typee == "Review":
        photo_read_service = ReadService(ReviewPhoto)
        photos = await photo_read_service.get_by_condition([{'review_id':id_}], db)
    photo_path = []
    for photo in photos:
        photo_path.append(photo.path)
    return photo_path

def delete_folder_aws(folder_name: str):
    s3 = boto3.resource('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    bucket = s3.Bucket(AWS_BUCKET_NAME)
    for obj in bucket.objects.filter(Prefix=normalization(folder_name) + '/'):
        s3.Object(bucket.name, obj.key).delete()
            
@router.delete("/delete_photo")
async def delete_photo(typee: str, path: str, db: AsyncSession = Depends(get_db)):
    try:
        s3_client.delete_object(Bucket=AWS_BUCKET_NAME, Key=path.split(AWS_LINK)[-1])
        if typee == "Book":
            photo_read_service = ReadService(BookPhoto)
            id_ = await photo_read_service.get_by_condition([{'path':path}], db)
            photo_delete_service = DeleteService(BookPhoto)
        if typee == "User":
            photo_read_service = ReadService(UserPhoto)
            id_ = await photo_read_service.get_by_condition([{'path':path}], db)
            photo_delete_service = DeleteService(UserPhoto)
        if typee == "Review":
            photo_read_service = ReadService(ReviewPhoto)
            id_ = await photo_read_service.get_by_condition([{'path':path}], db)
            photo_delete_service = DeleteService(ReviewPhoto)
        await photo_delete_service.delete(id_[0].id, db)
        return JSONResponse(content={"message": "File deleted successfully"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)