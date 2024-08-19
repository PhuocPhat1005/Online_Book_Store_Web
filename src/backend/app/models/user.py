from sqlalchemy import Column, String, ForeignKey, TIMESTAMP, func, event, Enum, Text
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID
import enum
from scipy.signal._wavelets import cascade


class GenderEnum(enum.Enum):
    male = "male"
    female = "female"
    lgbtq = "lgbtq+"
    none = "none"


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    account_id = Column(UUID, ForeignKey("accounts.id", ondelete="CASCADE"), nullable=False)
    phone = Column(String(15))
    full_name = Column(String(255))
    date_of_birth = Column(TIMESTAMP)
    gender = Column(Enum(GenderEnum), default=GenderEnum)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(
        TIMESTAMP, server_default=func.now(), onupdate=func.now()
    )
    description = Column(Text)
    user_ava = Column(String(255))
    cart_id = Column(UUID, nullable=False, default = uuid.uuid4())
    
    addresses = relationship("Address", back_populates="user", cascade="all, delete-orphan")
    account = relationship("Account", back_populates="user")
    photos = relationship("UserPhoto", back_populates="user", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="user", cascade="all, delete-orphan")
