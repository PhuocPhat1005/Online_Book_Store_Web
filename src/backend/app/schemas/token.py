from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    refreseh_token: str


class TokenData(BaseModel):
    username: str | None = None
