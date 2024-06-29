from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, DECIMAL
from app.database.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Photo(Base):
    __tablename__ = "photos_test"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    photo_name = Column(String, nullable=False)
    photo_url = Column(String, nullable=False)
    photo_content = Column(String, nullable=False)

    