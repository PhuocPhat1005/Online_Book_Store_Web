from sqlalchemy import Column, UUID, ForeignKey, Integer
from ..engine import Base

class StoreHaveBook(Base):
    __tablename__ = 'store_have_books'
    store_id = Column(UUID, ForeignKey('stores.store_id'), primary_key=True)
    book_id = Column(UUID, ForeignKey('books.book_id'), primary_key=True)
    quantity_in_stock = Column(Integer, nullable=False)
