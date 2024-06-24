from sqlalchemy import Column, ForeignKey, TIMESTAMP, Text, func, event
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime


class UserPhoto(Base):
    __tablename__ = "user_photos"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)
    photo = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    updated_at = Column(
        TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    user = relationship("User", back_populates="photos")


@event.listens_for(UserPhoto, "before_update")
def receive_before_update(mapper, connection, target):
    target.updated_at = datetime.utcnow()