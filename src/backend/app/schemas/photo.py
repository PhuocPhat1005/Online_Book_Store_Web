from pydantic import BaseModel
from uuid import UUID

class PhotoBase(BaseModel):
    photo_name: str
    photo_url: str
    photo_content: str

class PhotoCreate(PhotoBase):
    pass

class PhotoUpdate(BaseModel):
    photo_name: str | None = None
    photo_url: str | None = None
    photo_content: str | None = None
    

class PhotoResponse(PhotoBase):
    id: UUID
