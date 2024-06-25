from pydantic import BaseModel
from datetime import date
from typing import Optional
from uuid import UUID

class BookCreate(BaseModel):
    book_name: str
    isbn: str
    publishing_company_id: Optional[UUID] = None
    author_id: Optional[UUID] = None
    category_id: Optional[UUID] = None
    publishing_date: Optional[date] = None
    price: float
    language: str
    book_size: str
    page_number: int
    book_cover_type: str
    description: Optional[str] = None