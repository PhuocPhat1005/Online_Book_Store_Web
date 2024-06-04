from sqlalchemy import Column, String, UUID, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship


class Address(Base):
    __tablename__ = "addresses"
    address_id = Column(UUID, primary_key=True)
    ward_id = Column(UUID, ForeignKey("wards.ward_id"), nullable=False)
    address_detail = Column(String(255), nullable=False)

    ward = relationship("Ward")
