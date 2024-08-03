import uuid
from datetime import datetime
from sqlalchemy import Column, String, TIMESTAMP, func, event
from app.database.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID


class Account(Base):
    __tablename__ = "accounts"
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        default=uuid.uuid4(),
        unique=True,
        nullable=False,
    )
    username = Column(String(255), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False)

    user = relationship("User", back_populates="account", cascade="all, delete-orphan")


@event.listens_for(Account, "before_update")
def receive_before_update(mapper, connection, target):
    target.updated_at = datetime.utcnow()
