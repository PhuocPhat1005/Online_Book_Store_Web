from pydantic import BaseModel
from uuid import UUID

class CategoryBase(BaseModel):
    name: str
    parent_id: UUID | None = None
    description: str | None = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: UUID

class CategoryNameQuery(BaseModel):
    name: str