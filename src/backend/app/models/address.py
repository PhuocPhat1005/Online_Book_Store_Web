from sqlalchemy import Column, String, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID


class Address(Base):
    __tablename__ = "addresses"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    ward_id = Column(UUID, ForeignKey("wards.id"), nullable=False)
    address_detail = Column(String(255), nullable=False)

    ward = relationship("Ward")
