from sqlalchemy import Column, String
from app.database.database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Admin(Base):
    __tablename__ = "admins"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    admin_name = Column(String(255), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
