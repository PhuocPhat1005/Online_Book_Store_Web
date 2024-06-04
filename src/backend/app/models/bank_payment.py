from sqlalchemy import Column, String, UUID, ForeignKey, TIMESTAMP
from app.database.database import Base


class BankPayment(Base):
    __tablename__ = "bank_payments"
    payment_id = Column(UUID, ForeignKey("payments.payment_id"), primary_key=True)
    bank_name = Column(String(50), nullable=False)
    account_number = Column(String(50), nullable=False)
    account_name = Column(String(50), nullable=False)
    transaction_date = Column(TIMESTAMP, nullable=False)
