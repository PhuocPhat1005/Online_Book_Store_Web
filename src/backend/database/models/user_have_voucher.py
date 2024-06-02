from sqlalchemy import Column, UUID, ForeignKey
from ..engine import Base

class UserHaveVoucher(Base):
    __tablename__ = 'user_have_vouchers'
    user_id = Column(UUID, ForeignKey('users.user_id'), primary_key=True)
    voucher_id = Column(UUID, ForeignKey('vouchers.voucher_id'), primary_key=True)
