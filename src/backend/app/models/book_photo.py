from sqlalchemy import Column, Text, TIMESTAMP, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid


class BookPhoto(Base):
    __tablename__ = "book_photos"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    book_id = Column(UUID, ForeignKey("books.id", ondelete="CASCADE"), nullable=False)
    path = Column(Text, nullable=False)

    book = relationship("Book", back_populates="photos")
