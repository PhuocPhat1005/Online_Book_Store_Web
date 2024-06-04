from sqlalchemy import Column, UUID, ForeignKey
from app.database.database import Base


class BookAuthor(Base):
    __tablename__ = "book_authors"
    book_id = Column(UUID, ForeignKey("books.book_id"), primary_key=True)
    author_id = Column(UUID, ForeignKey("authors.author_id"), primary_key=True)
