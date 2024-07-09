from sqlalchemy import Column, ForeignKey
from app.database.database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid


class BookAuthor(Base):
    __tablename__ = "book_authors"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    book_id = Column(UUID, ForeignKey("books.id", ondelete="CASCADE"), nullable=False)
    author_id = Column(UUID, ForeignKey("authors.id", ondelete="CASCADE"), nullable=False)