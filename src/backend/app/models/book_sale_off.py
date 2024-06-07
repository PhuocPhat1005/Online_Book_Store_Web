from sqlalchemy import Column, ForeignKey
from app.database.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID


class BookSaleOff(Base):
    __tablename__ = "book_sale_offs"
    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4())
    sale_off_id = Column(UUID, ForeignKey("sale_offs.id"), primary_key=True)
    book_id = Column(UUID, ForeignKey("books.id"), primary_key=True)
