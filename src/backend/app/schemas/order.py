from pydantic import BaseModel
from uuid import UUID

class OrderDetailBase(BaseModel):
    order_id: UUID | None = ""
    book_id: UUID | None = ""
    quantity: int = 1
    unit_price: float = 0.0
    
class OrderDetailCreate(OrderDetailBase):
    pass

class OrderDetailUpdate(OrderDetailBase):
    pass

class OrderBase(BaseModel):
    id: UUID | None = ""
    user_id: UUID | None = ""
    total_price: float = 0.0
    status: str = "Waiting for approval"
    address_id: UUID | None = ""
    payment_id: UUID | None = ""
    shipping_id: UUID | None = ""
    
class OrderCreate(OrderBase):
    pass

class OrderUpdate(OrderBase):
    pass