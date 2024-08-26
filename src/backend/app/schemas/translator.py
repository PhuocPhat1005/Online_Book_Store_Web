from pydantic import BaseModel
from uuid import UUID

class TranslatorBase(BaseModel):
    full_name: str| None = ""
    pen_name: str | None = ""

class TranslatorCreate(TranslatorBase):
    pass

class TranslatorUpdate(TranslatorBase):
    pass