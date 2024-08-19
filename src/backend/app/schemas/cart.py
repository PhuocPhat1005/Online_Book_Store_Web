from pydantic import BaseModel
from uuid import UUID

class CartBase(BaseModel):
    id: UUID | None = ""
    book_id: UUID | None = ""
    amount: int = 1

class CartCreate(CartBase):
    pass

class CartUpdate(CartBase):
    pass