from sqlalchemy import Column, String, UUID, Integer, Text, TIMESTAMP, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime


class Review(Base):
    __tablename__ = "reviews"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)
    book_id = Column(UUID, ForeignKey("books.id"), nullable=False)
    rating = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text)
    create_at = Column(TIMESTAMP)
    update_at = Column(TIMESTAMP)

    user = relationship("User")
    book = relationship("Book")
    photos = relationship("ReviewPhoto", back_populates="review")
    likes = relationship("ReviewLike", back_populates="review")
