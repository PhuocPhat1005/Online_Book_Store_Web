from sqlalchemy import Column, String, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid


class District(Base):
    __tablename__ = "districts"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    district_name = Column(String(255), nullable=False)
    province_id = Column(UUID, ForeignKey("provinces.id"), nullable=False)

    province = relationship("Province")
