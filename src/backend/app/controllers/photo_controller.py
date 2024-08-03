from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService
# from app.services.photo_service import upload_photo
from app.schemas.photo import PhotoCreate, PhotoUpdate, PhotoResponse
from app.models.user_photo import UserPhoto
from app.models.review_photo import ReviewPhoto
from app.models.book_photo import BookPhoto
from app.database.database import get_db
from uuid import UUID
import uuid
import shutil
import os
from app.config.config import settings
from sqlalchemy import select

router = APIRouter()
photo_path = settings.Photo_directory

@router.post("uploadfile")
async def create_upload_file(myfile: UploadFile):
    myfile.filename = f"{uuid.uuid4()}.jpg"
    file_path = f"{photo_path}/tmp/{myfile.filename}"
    with open(file_path, "wb") as f:
        f.write(myfile.file.read())
    return {"filename": myfile.filename}

@router.put("save_photo/{photo_name}", summary="Save photo from temp directory to right place", description="photo_name is above, photo_type must is 'Book', 'User', 'Review', id_ is id of book or user")
async def save_photo(photo_name: str, photo_type: str, id_: str, db: AsyncSession = Depends(get_db)):
    list_type = ["Book", "User", "Review"]
    if(photo_type not in list_type):
        return {"error": "Invalid type"}
    try:
        new_directory = f"{photo_path}/{photo_type}/{id_}"
        
        # Create the directory if it doesn't exist
        os.makedirs(new_directory, exist_ok=True)
        new_path = new_directory + "/" + photo_name
        # Move the photo to the new directory
        shutil.move(os.path.join(photo_path, 'tmp', photo_name), new_path)
        photo_id = photo_name.replace(".jpg", "")
        if photo_type == 'User':
            photo = UserPhoto(id = UUID(photo_id, version=4),user_id=id_, path=new_path)
        elif photo_type == 'Book':
            photo = BookPhoto(id = UUID(photo_id, version=4),book_id=id_, path=new_path)
        else:
            photo = ReviewPhoto(id = UUID(photo_id, version=4),review_id=id_, path=new_path)
        db.add(photo)
        try:
            await db.flush()
            await db.commit()
        except Exception as e:
            await db.rollback()
            raise RuntimeError(f"Failed to create Photo: {e}") from e
            
        return(f'Photo moved to {new_path}')
    except Exception as e:
        return(f'Error: {e}')
    
@router.get("show_photo")
async def show_photo(id_: str, db: AsyncSession = Depends(get_db)):
    query = select(BookPhoto).where(BookPhoto.book_id == id_)
    result = await db.execute(query)
    db_object = result.scalars().all()
    
    photos = []
    
    for object in db_object:
        photos.append(FileResponse(object.path))
        
    return photos
    