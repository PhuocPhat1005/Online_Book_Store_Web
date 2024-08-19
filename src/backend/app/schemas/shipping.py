from pydantic import BaseModel
from uuid import UUID

class ShippingBase(BaseModel):
    shipping_method: str | None = None
    shipping_company: str | None = None
    cost_unit: float | None = None
    
class ShippingCreate(ShippingBase):
    pass

class ShippingUpdate(ShippingBase):
    pass


