from sqlalchemy import Column, UUID, ForeignKey
from app.database.database import Base


class BookSaleOff(Base):
    __tablename__ = "book_sale_offs"
    sale_off_id = Column(UUID, ForeignKey("sale_offs.sale_off_id"), primary_key=True)
    book_id = Column(UUID, ForeignKey("books.book_id"), primary_key=True)
