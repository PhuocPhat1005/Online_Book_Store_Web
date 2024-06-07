from sqlalchemy import Column, String
from app.database.database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid


class PaymentMethod(Base):
    __tablename__ = "payment_methods"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    method_name = Column(String(50), nullable=False)
