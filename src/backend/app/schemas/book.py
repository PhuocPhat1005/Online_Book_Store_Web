from pydantic import BaseModel
from datetime import date
from uuid import UUID

class BookBase(BaseModel):
    book_name: str
    isbn: str
    publishing_company_id: UUID | None = None
    category_id: UUID | None = None
    publishing_date: date
    price: float
    language: str
    book_size: str
    page_number: int
    book_cover_type: str
    description: str

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    book_name: str | None = None
    isbn: str | None = None
    publishing_company_id: UUID | None = None
    category_id: UUID | None = None
    publishing_date: date | None = None
    price: float | None = None
    language: str | None = None
    book_size: str | None = None
    page_number: int | None = None
    book_cover_type: str | None = None
    description: str | None = None

class BookResponse(BookBase):
    id: UUID
    created_at: date
    updated_at: date

    class Config:
        orm_mode: True
        
class BookOrder(BaseModel):
    fromm: int | None = 0
    n: int
    order_by: str | None = "default"
    
class BookFilter(BaseModel):
    publishing_company_id: UUID | None = None
    category_id: UUID | None = None
    author_id: UUID | None = None
    price: int | None = 0
    book_cover_type: int | None = None