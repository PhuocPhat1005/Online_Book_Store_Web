from pydantic import BaseModel
from uuid import UUID
from datetime import date


class VoucherBase(BaseModel):
    code: str | None = ""
    discount: int | None = 0
    valid_from: date | None = None
    valid_to: date | None = None

class VoucherCreate(VoucherBase):
    pass

class VoucherUpdate(VoucherBase):
    pass

