from pydantic import BaseModel
from uuid import UUID

class TranslatorBase(BaseModel):
    full_name: str
    pen_name: str | None = None

class TranslatorCreate(TranslatorBase):
    pass

class TranslatorUpdate(BaseModel):
    full_name: str | None = None
    pen_name: str | None = None

class TranslatorResponse(TranslatorBase):
    id: UUID

    class Config:
        orm_mode: True