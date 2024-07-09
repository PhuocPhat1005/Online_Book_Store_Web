from pydantic import BaseModel
from uuid import UUID

class Book_Author_Base(BaseModel):
    book_id: UUID
    author_id: UUID

class Book_Author_Create(Book_Author_Base):
    pass

class Book_Author_Update(Book_Author_Base):
    pass