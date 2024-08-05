from pydantic import BaseModel
from uuid import UUID
from datetime import date

class UserBase(BaseModel):
    account_id: UUID
    phone: str
    full_name: str
    date_of_birth: date | None = None
    gender: str | None = "none"
    description: str | None = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    phone: str | None = None
    full_name: str | None = None
    date_of_birth: date | None = None
    gender: str | None = "none"
    description: str | None = None
    user_ava: str | None = None
    
    
class UserResponse(UserUpdate):
    pass
    
    