from pydantic import BaseModel
from uuid import UUID

class AuthorBase(BaseModel):
    full_name: str
    pen_name: str | None = None
    description: str | None = None

class AuthorCreate(AuthorBase):
    pass

class AuthorUpdate(BaseModel):
    full_name: str
    pen_name: str | None = None
    description: str | None = None
class AuthorResponse(AuthorBase):
    id: UUID