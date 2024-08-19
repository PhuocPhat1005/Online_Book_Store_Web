from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, DECIMAL, func
from app.database.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Order(Base):
    __tablename__ = "orders"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)
    order_date = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=False)
    status = Column(String(50), nullable=False)
    address_id = Column(UUID, ForeignKey("addresses.id", ondelete="SET NULL"))
    payment_id = Column(UUID, ForeignKey("payments.id", ondelete="SET NULL"))
    shipping_id = Column(UUID, ForeignKey("shippings.id", ondelete="SET NULL"))
    
    # address_id = Column(UUID)
    # payment_id = Column(UUID)
    # shipping_id = Column(UUID)
    
    user = relationship("User")
    details = relationship("OrderDetail", back_populates="order", cascade="all, delete-orphan")
    address = relationship("Address")
    shipping = relationship("Shipping")
    payment = relationship("Payment")
