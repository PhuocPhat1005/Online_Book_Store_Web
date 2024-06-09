from sqlalchemy import Column, String, ForeignKey, TIMESTAMP, func, event, Enum
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID
import enum


class GenderEnum(enum.Enum):
    male = "male"
    female = "female"
    lgbtq = "lgbtq+"


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    account_id = Column(UUID, ForeignKey("accounts.id"), nullable=False)
    phone = Column(String(15), nullable=False)
    full_name = Column(String(255), nullable=False)
    date_of_birth = Column(TIMESTAMP)
    gender = Column(Enum(GenderEnum), nullable=False, default=GenderEnum)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    updated_at = Column(
        TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    account = relationship("Account", back_populates="user")
    photos = relationship("UserPhoto", back_populates="user")
