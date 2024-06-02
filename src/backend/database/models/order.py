from sqlalchemy import Column, String, UUID, TIMESTAMP, ForeignKey, DECIMAL
from ..engine import Base
from sqlalchemy.orm import relationship

class Order(Base):
    __tablename__ = 'orders'
    order_id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('users.user_id'), nullable=False)
    order_date = Column(TIMESTAMP, nullable=False)
    total_amount = Column(DECIMAL(10, 2), nullable=False)
    status = Column(String(50), nullable=False)

    user = relationship('User')
    details = relationship('OrderDetail', back_populates='order')
