from pydantic import BaseModel
from datetime import date
from uuid import UUID

class BookCreate(BaseModel):
    book_name: str
    isbn: str
    publishing_company_id: str | None = "empty_uuid" 
    category_id: str | None = "empty_uuid" 
    sale_off: str | None = "empty_uuid"
    publishing_date: date
    price: float
    language: str
    book_size: str
    page_number: int
    book_cover_type: str
    description: str
    book_ava: str | None = ""
    amount_sell: int | None = 0
    amount_rate: int | None = 0
    rate: float | None = 5

class BookUpdate(BaseModel):
    book_name: str | None = ""
    isbn: str | None = ""
    publishing_company_id: str | None = "" 
    category_id: str | None = "" 
    sale_off: str | None = ""
    publishing_date: date | None = None
    price: float | None = -1
    language: str | None = ""
    book_size: str | None = ""
    page_number: int | None = -1
    book_cover_type: str | None = ""
    description: str | None = ""
    book_ava: str | None = ""
    amount_sell: int | None = -1
    amount_rate: int | None = -1
    rate: float | None = -1


