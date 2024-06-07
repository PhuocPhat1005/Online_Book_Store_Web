from sqlalchemy import Column, ForeignKey, DECIMAL, TIMESTAMP
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID


class Payment(Base):
    __tablename__ = "payments"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    order_id = Column(UUID, ForeignKey("orders.id"), nullable=False)
    payment_method_id = Column(UUID, ForeignKey("payment_methods.id"), nullable=False)
    payment_status_id = Column(UUID, ForeignKey("payment_statuses.id"), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    payment_date = Column(TIMESTAMP, nullable=False)

    order = relationship("Order")
    method = relationship("PaymentMethod")
    status = relationship("PaymentStatus")
