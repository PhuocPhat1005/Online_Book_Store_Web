from sqlalchemy import Column, String
from app.database.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID


class PaymentStatus(Base):
    __tablename__ = "payment_statuses"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    status_name = Column(String(50), nullable=False)
