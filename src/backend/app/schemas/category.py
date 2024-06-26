from pydantic import BaseModel
from uuid import UUID

class CategoryBase(BaseModel):
    category_name: str
    parent_category_id: UUID | None = None
    description: str | None = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    category_name: str | None = None
    parent_category_id: UUID | None = None
    description: str | None = None

class CategoryResponse(CategoryBase):
    id: UUID

class CategoryNameQuery(BaseModel):
    name: str