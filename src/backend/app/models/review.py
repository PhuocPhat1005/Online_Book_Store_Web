from sqlalchemy import Column, String, UUID, Integer, Text, TIMESTAMP, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship


class Review(Base):
    __tablename__ = "reviews"
    review_id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey("users.user_id"), nullable=False)
    book_id = Column(UUID, ForeignKey("books.book_id"), nullable=False)
    rating = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text)
    create_at = Column(TIMESTAMP)
    update_at = Column(TIMESTAMP)

    user = relationship("User")
    book = relationship("Book")
    photos = relationship("ReviewPhoto", back_populates="review")
    likes = relationship("ReviewLike", back_populates="review")
