from sqlalchemy import Column, String, UUID, ForeignKey, TIMESTAMP
from ..engine import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'
    user_id = Column(UUID, primary_key=True)
    account_id = Column(UUID, ForeignKey('accounts.account_id'), nullable=False)
    phone = Column(String(15), nullable=False)
    full_name = Column(String(255), nullable=False)
    date_of_birth = Column(TIMESTAMP)
    gender = Column(String(10))
    create_at = Column(TIMESTAMP)
    update_at = Column(TIMESTAMP)

    account = relationship('Account', back_populates='user')
    photos = relationship('UserPhoto', back_populates='user')
