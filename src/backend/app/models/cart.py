from sqlalchemy import Column, ForeignKey, Integer, Boolean
from app.database.database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Cart(Base):
    __tablename__ = "cart"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    book_id = Column(UUID(as_uuid=True), ForeignKey("books.id"), primary_key=True, index=True)
    amount = Column(Integer)
    is_choose = Column(Boolean, default=True)