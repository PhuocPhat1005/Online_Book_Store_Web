from pydantic import BaseModel
from datetime import date
from uuid import UUID

class BookBase(BaseModel):
    book_name: str
    isbn: str
    publishing_company_id: UUID | None = None
    category_id: UUID | None = None
    author_id: UUID | None = None
    publishing_date: date
    price: float
    language: str
    book_size: str
    page_number: int
    book_cover_type: str
    description: str

class BookCreate(BookBase):
    pass

class BookUpdate(BookBase):
    pass

class BookResponse(BookBase):
    id: UUID
