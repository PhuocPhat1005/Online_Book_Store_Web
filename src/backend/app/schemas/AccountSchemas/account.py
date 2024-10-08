from pydantic import BaseModel, EmailStr
from datetime import date
class AccountCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class AccountLogin(BaseModel):
    username: str
    password: str

class EmailVerify(BaseModel):
    email: EmailStr

class UserEmail(BaseModel):
    email: EmailStr
class ResetPasswordForm(BaseModel):
    token: str
    password: str
    
class AccountBanned(BaseModel):
    id: str | None = "empty_uuid"
    banned_to: date
    
class AdminCreate(BaseModel):
    admin_name: str
    password_hash: str
    
class AdminUpdate(BaseModel):
    admin_name: str | None = ""
    password_hash: str | None = ""