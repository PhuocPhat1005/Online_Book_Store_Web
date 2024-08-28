from pydantic import BaseModel
from uuid import UUID

class OrderDetailBase(BaseModel):
    order_id: str | None = "empty_uuid"
    book_id: str | None = "empty_uuid"
    quantity: int | None = -1
    unit_price: float | None = -1
    
class OrderDetailCreate(OrderDetailBase):
    pass

class OrderDetailUpdate(OrderDetailBase):
    pass

class OrderBase(BaseModel):
    id: str | None = "empty_uuid"
    user_id: str | None = "empty_uuid"
    status: str = "Waiting for approval"
    address_id: str | None = "empty_uuid"
    payment_id: str | None = "empty_uuid"
    shipping_id: str | None = "empty_uuid"
    
class OrderCreate(OrderBase):
    total_price: float | None = 0
    pass

class OrderUpdate(OrderBase):
    total_price: float | None = -1
    pass