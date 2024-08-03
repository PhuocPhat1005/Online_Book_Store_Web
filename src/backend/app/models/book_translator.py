from sqlalchemy import Column, ForeignKey
from app.database.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID


class BookTranslator(Base):
    __tablename__ = "book_translators"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    book_id = Column(UUID, ForeignKey("books.id", ondelete="CASCADE"), nullable=False)
    translator_id = Column(UUID, ForeignKey("translators.id", ondelete="CASCADE"), nullable=False)
