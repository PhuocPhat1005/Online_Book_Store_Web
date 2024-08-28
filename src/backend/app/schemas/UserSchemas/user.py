from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional
from app.models.user import GenderEnum


class UserBase(BaseModel):
    account_id: UUID
    phone: str | None = ""
    full_name: str | None = ""
    date_of_birth: Optional[datetime] = None
    gender: Optional[GenderEnum] = GenderEnum.none
    description: Optional[str] = None
    user_ava: Optional[str] = None
    cart_id: UUID | None = None


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    phone: Optional[str] = ""
    full_name: Optional[str] = ""
    date_of_birth: Optional[datetime] = None
    gender: Optional[GenderEnum] = GenderEnum.none
    description: Optional[str] = ""
    user_ava: Optional[str] = ""


class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
