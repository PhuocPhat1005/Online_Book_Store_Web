from pydantic import BaseModel
from uuid import UUID

class PhotoBase(BaseModel):
    photo_name: str | None = ""
    photo_url: str | None = ""
    photo_content: str | None = ""

class PhotoCreate(PhotoBase):
    pass

class PhotoUpdate(BaseModel):
    photo_name: str | None = ""
    photo_url: str | None = ""
    photo_content: str | None = ""
    