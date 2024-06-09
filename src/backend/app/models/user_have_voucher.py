from sqlalchemy import Column, UUID, ForeignKey
from app.database.database import Base


class UserHaveVoucher(Base):
    __tablename__ = "user_have_vouchers"
    user_id = Column(UUID, ForeignKey("users.id"), primary_key=True)
    voucher_id = Column(UUID, ForeignKey("vouchers.id"), primary_key=True)
