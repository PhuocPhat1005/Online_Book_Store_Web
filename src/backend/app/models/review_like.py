from sqlalchemy import Column, ForeignKey, TIMESTAMP, func, event
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime


class ReviewLike(Base):
    __tablename__ = "review_likes"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    review_id = Column(UUID, ForeignKey("reviews.id"), nullable=False)
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    updated_at = Column(
        TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    review = relationship("Review", back_populates="likes")
    user = relationship("User")


@event.listens_for(ReviewLike, "before_update")
def receive_before_update(mapper, connection, target):
    target.updated_at = datetime.utcnow()
