from sqlalchemy import Column, String, UUID, Integer, TIMESTAMP
from ..engine import Base

class Voucher(Base):
    __tablename__ = 'vouchers'
    voucher_id = Column(UUID, primary_key=True)
    code = Column(String(50), nullable=False, unique=True)
    discount = Column(Integer, nullable=False)
    valid_from = Column(TIMESTAMP, nullable=False)
    valid_to = Column(TIMESTAMP, nullable=False)
