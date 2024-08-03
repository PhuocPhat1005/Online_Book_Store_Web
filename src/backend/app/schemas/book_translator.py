from pydantic import BaseModel
from uuid import UUID

class Book_Translator_Base(BaseModel):
    book_id: UUID
    translator_id: UUID

class Book_Translator_Create(Book_Translator_Base):
    pass

class Book_Translator_Update(Book_Translator_Base):
    pass