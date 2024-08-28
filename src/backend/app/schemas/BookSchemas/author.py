from pydantic import BaseModel
from uuid import UUID

class AuthorBase(BaseModel):
    id: str | None = "empty_uuid"
    full_name: str | None = ""
    pen_name: str | None = ""
    description: str | None = ""

class AuthorCreate(AuthorBase):
    pass

class AuthorUpdate(AuthorBase):
    pass