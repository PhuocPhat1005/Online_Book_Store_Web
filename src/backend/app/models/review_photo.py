from sqlalchemy import Column, ForeignKey, TIMESTAMP, Text
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID


class ReviewPhoto(Base):
    __tablename__ = "review_photos"
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        default=uuid.uuid4(),
    )
    review_id = Column(UUID, ForeignKey("reviews.id"), nullable=False)
    photo = Column(Text)
    create_at = Column(TIMESTAMP)
    update_at = Column(TIMESTAMP)

    review = relationship("Review", back_populates="photos")
