from pydantic import BaseModel
from datetime import date
from uuid import UUID
from typing import Optional

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
    book_ava: str | None = None

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    book_name: Optional[str] = None
    isbn: Optional[str] = None
    publishing_company_id: Optional[UUID] = None
    category_id: Optional[UUID] = None
    publishing_date: Optional[date] = None
    price: Optional[float] = None
    language: Optional[str] = None
    book_size: Optional[str] = None
    page_number: Optional[int] = None
    book_cover_type: Optional[str] = None
    description: Optional[str] = None
    book_ava: Optional[str] = None

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