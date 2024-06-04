from sqlalchemy import Column, UUID, ForeignKey, DECIMAL, TIMESTAMP
from app.database.database import Base
from sqlalchemy.orm import relationship


class Payment(Base):
    __tablename__ = "payments"
    payment_id = Column(UUID, primary_key=True)
    order_id = Column(UUID, ForeignKey("orders.order_id"), nullable=False)
    payment_method_id = Column(
        UUID, ForeignKey("payment_methods.payment_method_id"), nullable=False
    )
    payment_status_id = Column(
        UUID, ForeignKey("payment_statuses.payment_status_id"), nullable=False
    )
    amount = Column(DECIMAL(10, 2), nullable=False)
    payment_date = Column(TIMESTAMP, nullable=False)

    order = relationship("Order")
    method = relationship("PaymentMethod")
    status = relationship("PaymentStatus")
