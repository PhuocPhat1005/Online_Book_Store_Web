from pydantic import BaseModel
from datetime import datetime

class SaleOffBase(BaseModel):
    sale_off_name: str | None = None
    sale_off: int | None = None
    time_start: datetime | None = None
    time_end: datetime | None = None
    
class SaleOffCreate(SaleOffBase):
    pass

class SaleOffUpdate(SaleOffBase):
    pass


