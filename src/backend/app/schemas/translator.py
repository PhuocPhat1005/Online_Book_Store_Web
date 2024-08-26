from pydantic import BaseModel
from uuid import UUID

class TranslatorBase(BaseModel):
    id: str | None = "empty_uuid"
    full_name: str| None = ""
    pen_name: str | None = ""

class TranslatorCreate(TranslatorBase):
    pass

class TranslatorUpdate(TranslatorBase):
    pass