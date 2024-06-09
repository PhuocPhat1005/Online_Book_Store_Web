from sqlalchemy import Column, ForeignKey, Integer, DECIMAL
from app.database.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid


class OrderDetail(Base):
    __tablename__ = "order_details"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    order_id = Column(UUID, ForeignKey("orders.id"), primary_key=True)
    book_id = Column(UUID, ForeignKey("books.id"), primary_key=True)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(DECIMAL(10, 2), nullable=False)

    order = relationship("Order", back_populates="details")
    book = relationship("Book")
