from sqlalchemy import Column, String, UUID, ForeignKey
from ..engine import Base
from sqlalchemy.orm import relationship

class District(Base):
    __tablename__ = 'districts'
    district_id = Column(UUID, primary_key=True)
    district_name = Column(String(255), nullable=False)
    province_id = Column(UUID, ForeignKey('provinces.province_id'), nullable=False)

    province = relationship('Province')
