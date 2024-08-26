from pydantic import BaseModel
from uuid import UUID

class CartBase(BaseModel):
    id: str | None = "empty_uuid"
    book_id: str | None = "empty_uuid"
    amount: int | None = -1

class CartCreate(CartBase):
    pass

class CartUpdate(CartBase):
    pass