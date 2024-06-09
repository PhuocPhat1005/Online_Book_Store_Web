from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, DECIMAL
from app.database.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Order(Base):
    __tablename__ = "orders"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)
    order_date = Column(TIMESTAMP, nullable=False)
    total_amount = Column(DECIMAL(10, 2), nullable=False)
    status = Column(String(50), nullable=False)

    user = relationship("User")
    details = relationship("OrderDetail", back_populates="order")
