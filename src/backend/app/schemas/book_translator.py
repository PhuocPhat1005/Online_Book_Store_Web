from pydantic import BaseModel
from uuid import UUID

class Book_Translator_Base(BaseModel):
    book_id: str | None = "empty_uuid"
    translator_id: str | None = "empty_uuid"

class Book_Translator_Create(Book_Translator_Base):
    pass

class Book_Translator_Update(Book_Translator_Base):
    pass