from pydantic import BaseModel
from datetime import datetime

class SaleOffBase(BaseModel):
    sale_off_name: str | None = ""
    time_start: datetime | None = None
    time_end: datetime | None = None
    
class SaleOffCreate(SaleOffBase):
    sale_off: int | None = 0

class SaleOffUpdate(SaleOffBase):
    sale_off: int | None = -1


