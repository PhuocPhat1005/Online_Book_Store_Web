from pydantic import BaseModel
from uuid import UUID

class Book_Author_Base(BaseModel):
    book_id: str | None = "empty_uuid"
    author_id: str | None = "empty_uuid"

class Book_Author_Create(Book_Author_Base):
    pass

class Book_Author_Update(Book_Author_Base):
    pass