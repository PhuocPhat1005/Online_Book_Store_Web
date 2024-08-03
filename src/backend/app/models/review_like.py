from sqlalchemy import Column, ForeignKey, TIMESTAMP, func, event
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime

class ReviewLike(Base):
    __tablename__ = "review_likes"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    review_id = Column(UUID, ForeignKey("reviews.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    review = relationship("Review", back_populates="likes")
    user = relationship("User")


@event.listens_for(ReviewLike, "before_update")
def receive_before_update(mapper, connection, target):
    target.updated_at = datetime.utcnow()
