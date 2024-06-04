from sqlalchemy import Column, UUID, ForeignKey
from app.database.database import Base


class BookTranslator(Base):
    __tablename__ = "translator_authors"
    book_id = Column(UUID, ForeignKey("books.book_id"), primary_key=True)
    translator_id = Column(
        UUID, ForeignKey("translators.translator_id"), primary_key=True
    )
