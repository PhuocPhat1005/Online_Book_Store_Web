from sqlalchemy import Column, String, UUID
from app.database.database import Base


class PaymentMethod(Base):
    __tablename__ = "payment_methods"
    payment_method_id = Column(UUID, primary_key=True)
    method_name = Column(String(50), nullable=False)
