from sqlalchemy import Column, String, UUID, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID


class Ward(Base):
    __tablename__ = "wards"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    ward_name = Column(String(255), nullable=False)
    district_id = Column(UUID, ForeignKey("districts.id"), nullable=False)

    district = relationship("District")
