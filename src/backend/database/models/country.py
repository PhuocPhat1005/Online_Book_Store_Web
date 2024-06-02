from sqlalchemy import Column, String, UUID
from ..engine import Base

class Country(Base):
    __tablename__ = 'countries'
    country_id = Column(UUID, primary_key=True)
    country_name = Column(String(255), nullable=False)
