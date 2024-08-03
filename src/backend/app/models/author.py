from sqlalchemy import Column, String, Text
from app.database.database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship


class Author(Base):
    __tablename__ = "authors"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    full_name = Column(String(255), nullable=False)
    pen_name = Column(String(255))
    description = Column(Text)

    books = relationship("Book", secondary="book_authors", back_populates="authors")