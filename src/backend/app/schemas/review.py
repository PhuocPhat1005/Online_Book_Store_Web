from pydantic import BaseModel
from uuid import UUID

class ReviewBase(BaseModel):
    user_id: str | None = ""
    book_id: str | None = ""
    rating: int | None = 5
    title: str | None = ""
    content: str | None = ""
    
class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(ReviewBase):
    pass