from sqlalchemy import Column, UUID, ForeignKey, String, TIMESTAMP, DECIMAL
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime


class Shipping(Base):
    __tablename__ = "shippings"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    shipping_method = Column(String(50), nullable=False)
    shipping_company = Column(String(50), nullable=False)
    cost_unit = Column(DECIMAL(10, 2), nullable=False)

    orders = relationship("Order", back_populates="shipping")