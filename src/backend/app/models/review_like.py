from sqlalchemy import Column, UUID, ForeignKey, TIMESTAMP
from app.database.database import Base
from sqlalchemy.orm import relationship


class ReviewLike(Base):
    __tablename__ = "review_likes"
    review_like_id = Column(UUID, primary_key=True)
    review_id = Column(UUID, ForeignKey("reviews.review_id"), nullable=False)
    user_id = Column(UUID, ForeignKey("users.user_id"), nullable=False)
    create_at = Column(TIMESTAMP)

    review = relationship("Review", back_populates="likes")
    user = relationship("User")
