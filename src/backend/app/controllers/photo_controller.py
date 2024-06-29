from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService
# from app.services.photo_service import upload_photo
from app.schemas.photo import PhotoCreate, PhotoUpdate, PhotoResponse
from app.models.photo import Photo
from app.database.database import get_db
from uuid import UUID
import uuid
import shutil

router = APIRouter()
photo_service = CRUDService[Photo, PhotoCreate, PhotoUpdate](Photo)
IMG_PATH = "app/database/image/"

@router.post("uploadfile")
async def create_upload_file(myfile: UploadFile):
    myfile.filename = f"{uuid.uuid4()}.jpg"
    file_path = f"{IMG_PATH}tmp/{myfile.filename}"
    with open(file_path, "wb") as f:
        f.write(myfile.file.read())
    return {"Upload to temp file": file_path}

@router.put("save_image/{photo_name}")
async def save_image(photo_name: str, photo_type: str):
    list_type = ["Book", "User"]
    if(photo_type not in list_type):
        return {"error": "Invalid type"}
    try:
        shutil.move(IMG_PATH + "tmp/" + photo_name, IMG_PATH + photo_type + '/' + photo_name)
        return {"Save image to": IMG_PATH + photo_type + '/' + photo_name}
    except Exception as e:
        return {"error": str(e)}
    
@router.get("show_image/{photo_name}")
async def show_image(photo_name: str):
    return FileResponse(f"{IMG_PATH + photo_name}")

    

# @router.post("/create_photo", summary="Create a new photo")
# async def create_photo_endpoint(photo: PhotoCreate,  db: AsyncSession = Depends(get_db)):
#     return await upload_photo(photo, db)

# #up file trc r goi api dat ten, dia chi,.... sau
# # @router.post("/create_photo", summary="Create a new photo")
# # async def create_photo_endpoint(myfile: UploadFile,  db: AsyncSession = Depends(get_db)):
# #     contents = await myfile.read()
# #     return


# @router.get("/get_photo/{photo_id}", summary="Get a photo by ID")
# async def get_photo_endpoint(photo_id: UUID, db: AsyncSession = Depends(get_db)):
#     photo = await photo_service.get(photo_id, db)
#     if not photo:
#         raise HTTPException(status_code=404, detail="Photo not found")
#     return photo

# @router.get("/get_photo_by_name/{photo_name}", summary="Get photos by name")
# async def get_photos_by_name_endpoint(photo_name: str, db: AsyncSession = Depends(get_db)):
#     photos = await photo_service.get_by_name(photo_name, [Photo.photo_name], db)
#     if not photos:
#         raise HTTPException(status_code=404, detail="No photos found with that name")
#     return photos

# @router.put("/update_photo/{photo_id}", summary="Update a photo by ID")
# async def update_photo_endpoint(photo_id: UUID, photo_update: PhotoUpdate, db: AsyncSession = Depends(get_db)):
#     photo = await photo_service.update(photo_id, photo_update, db)
#     if not photo:
#         raise HTTPException(status_code=404, detail="Photo not found")
#     return photo

# @router.delete("/delete_photo/{photo_id}", summary="Delete a photo by ID")
# async def delete_photo_endpoint(photo_id: UUID, db: AsyncSession = Depends(get_db)):
#     photo = await photo_service.delete(photo_id, db)
#     if not photo:
#         raise HTTPException(status_code=404, detail="photo not found")
#     return photo