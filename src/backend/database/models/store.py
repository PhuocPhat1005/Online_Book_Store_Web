from sqlalchemy import Column, String, UUID
from ..engine import Base

class Store(Base):
    __tablename__ = 'stores'
    store_id = Column(UUID, primary_key=True)
    store_name = Column(String(255), nullable=False)
    phone = Column(String(15), nullable=False)
