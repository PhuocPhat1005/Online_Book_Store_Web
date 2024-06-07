from sqlalchemy import Column, String, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID


class Province(Base):
    __tablename__ = "provinces"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    province_name = Column(String(255), nullable=False)
    country_id = Column(UUID, ForeignKey("countries.id"), nullable=False)

    country = relationship("Country")
