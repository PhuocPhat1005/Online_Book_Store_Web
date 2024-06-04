from sqlalchemy import Column, UUID, ForeignKey, TIMESTAMP, Text
from app.database.database import Base
from sqlalchemy.orm import relationship


class ReviewPhoto(Base):
    __tablename__ = "review_photos"
    review_photo_id = Column(UUID, primary_key=True)
    review_id = Column(UUID, ForeignKey("reviews.review_id"), nullable=False)
    photo = Column(Text)
    create_at = Column(TIMESTAMP)
    update_at = Column(TIMESTAMP)

    review = relationship("Review", back_populates="photos")
