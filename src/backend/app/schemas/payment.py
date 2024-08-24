from pydantic import BaseModel
from uuid import UUID

class PaymentBase(BaseModel):
    id: str | None = "empty_uuid"
    payment_method: str | None = ""
    payment_status: str | None = "Pending"

class PaymentCreate(PaymentBase):
    amount: float | None = 0
    pass

class PaymentUpdate(PaymentBase):
    amount: float | None = -1
    pass
