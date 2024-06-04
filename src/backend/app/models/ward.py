from sqlalchemy import Column, String, UUID, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship


class Ward(Base):
    __tablename__ = "wards"
    ward_id = Column(UUID, primary_key=True)
    ward_name = Column(String(255), nullable=False)
    district_id = Column(UUID, ForeignKey("districts.district_id"), nullable=False)

    district = relationship("District")
