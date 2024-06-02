from sqlalchemy import Column, String, UUID
from ..engine import Base

class PaymentStatus(Base):
    __tablename__ = 'payment_statuses'
    payment_status_id = Column(UUID, primary_key=True)
    status_name = Column(String(50), nullable=False)
