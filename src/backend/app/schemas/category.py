from pydantic import BaseModel
from uuid import UUID

class CategoryBase(BaseModel):
    id: str | None = "empty_uuid"
    category_name: str | None = ""
    parent_category_id: str | None = "empty_uuid"
    description: str | None = ""

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass
