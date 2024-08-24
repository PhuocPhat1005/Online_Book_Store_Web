from pydantic import BaseModel
from uuid import UUID
from datetime import date

class UserBase(BaseModel):
    account_id: UUID
    phone: str | None = ""
    full_name: str | None = ""
    date_of_birth: date | None = None
    gender: str | None = "none"
    description: str | None = ""
    user_ava: str | None = ""
    cart_id: UUID | None = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    phone: str | None = ""
    full_name: str | None = ""
    date_of_birth: date | None = None
    gender: str | None = "none"
    description: str | None = ""
    user_ava: str | None = ""
    
    
class UserResponse(UserUpdate):
    pass
    
    