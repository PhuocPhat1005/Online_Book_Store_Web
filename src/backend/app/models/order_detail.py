from sqlalchemy import Column, UUID, ForeignKey, Integer, DECIMAL
from app.database.database import Base
from sqlalchemy.orm import relationship


class OrderDetail(Base):
    __tablename__ = "order_details"
    order_id = Column(UUID, ForeignKey("orders.order_id"), primary_key=True)
    book_id = Column(UUID, ForeignKey("books.book_id"), primary_key=True)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(DECIMAL(10, 2), nullable=False)

    order = relationship("Order", back_populates="details")
    book = relationship("Book")
