from sqlalchemy import Column, String, UUID, TIMESTAMP
from app.database.database import Base


class Account(Base):
    __tablename__ = "accounts"
    account_id = Column(UUID, primary_key=True)
    username = Column(String(255), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    create_at = Column(TIMESTAMP)
    update_at = Column(TIMESTAMP)
