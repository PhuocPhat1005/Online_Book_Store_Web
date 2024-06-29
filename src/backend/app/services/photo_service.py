from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.photo import Photo
from app.schemas.photo import PhotoCreate
from fastapi import Depends, HTTPException, UploadFile
from app.config.config import settings
from app.database.database import get_db
import uuid


#Upload photo
# async def upload_photo(photo: PhotoCreate, db: AsyncSession):
#     new_photo = Photo(
#         id=uuid.uuid4(),  # Generate a new UUID
#         photo_name=photo.photo_name, #
#         photo_url=photo.photo_url,
#         photo_content=photo.photo_content
#     )
#     db.add(new_photo)
#     try:
#         await db.flush()
#         await db.commit()
#     except Exception as e:
#         await db.rollback()
#         raise RuntimeError(f"Failed to create photo: {e}") from e
#     return {"Uploaded"}
