from sqlalchemy import Column, ForeignKey
from app.database.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID


class BookTranslator(Base):
    __tablename__ = "translator_authors"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    book_id = Column(UUID, ForeignKey("books.id"), primary_key=True)
    translator_id = Column(UUID, ForeignKey("translators.id"), primary_key=True)
