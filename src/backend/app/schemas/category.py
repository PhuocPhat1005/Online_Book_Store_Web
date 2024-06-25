from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class CategoryCreate(BaseModel):
    name: str
    parent_id: Optional[UUID] = None
    description: str