from pydantic import BaseModel
from uuid import UUID

class PaymentBase(BaseModel):
    id: UUID | None = ""
    payment_method: str | None = None
    payment_status: str | None = "Pending"
    amount: float | None = -1

class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(PaymentBase):
    pass
