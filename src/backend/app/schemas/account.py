from pydantic import BaseModel, EmailStr


class AccountCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class AccountLogin(BaseModel):
    username: str
    password: str

class EmailVerify(BaseModel):
    email: EmailStr