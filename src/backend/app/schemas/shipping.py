from pydantic import BaseModel
from uuid import UUID

class ShippingBase(BaseModel):
    shipping_method: str | None = ""
    shipping_company: str | None = ""
    
class ShippingCreate(ShippingBase):
    cost_unit: float | None = 0

class ShippingUpdate(ShippingBase):
    cost_unit: float | None = -1


