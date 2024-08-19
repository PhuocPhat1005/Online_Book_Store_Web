from sqlalchemy import Column, ForeignKey, DECIMAL, TIMESTAMP, String
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID


class Payment(Base):
    __tablename__ = "payments"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    payment_method = Column(String(50), nullable=False)
    payment_status = Column(String(50), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)

    orders = relationship("Order", back_populates="payment")
    