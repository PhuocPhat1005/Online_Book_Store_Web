from sqlalchemy import Column, String, UUID
from app.database.database import Base


class Admin(Base):
    __tablename__ = "admins"
    admin_id = Column(UUID, primary_key=True)
    admin_name = Column(String(255), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
