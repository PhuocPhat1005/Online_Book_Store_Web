from pydantic import BaseModel
from uuid import UUID

class ReviewBase(BaseModel):
    user_id: str | None = ""
    book_id: str | None = ""
    title: str | None = ""
    content: str | None = ""
    
class ReviewCreate(ReviewBase):
    rating: int | None = 5

class ReviewUpdate(ReviewBase):
    rating: int | None = -1