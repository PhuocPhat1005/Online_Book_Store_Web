from sqlalchemy import Column, String, UUID, ForeignKey
from ..engine import Base
from sqlalchemy.orm import relationship

class Province(Base):
    __tablename__ = 'provinces'
    province_id = Column(UUID, primary_key=True)
    province_name = Column(String(255), nullable=False)
    country_id = Column(UUID, ForeignKey('countries.country_id'), nullable=False)

    country = relationship('Country')
