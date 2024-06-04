from sqlalchemy import Column, UUID, ForeignKey, String, TIMESTAMP, DECIMAL
from app.database.database import Base
from sqlalchemy.orm import relationship


class Shipping(Base):
    __tablename__ = "shippings"
    shipping_id = Column(UUID, primary_key=True)
    order_id = Column(UUID, ForeignKey("orders.order_id"), nullable=False)
    shipping_method = Column(String(50), nullable=False)
    shipping_address = Column(String(255), nullable=False)
    shipping_cost = Column(DECIMAL(10, 2), nullable=False)
    estimated_delivery_date = Column(TIMESTAMP, nullable=False)

    order = relationship("Order")
