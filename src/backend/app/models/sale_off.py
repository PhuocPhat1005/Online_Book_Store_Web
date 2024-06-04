from sqlalchemy import Column, String, UUID, Integer, TIMESTAMP
from app.database.database import Base


class SaleOff(Base):
    __tablename__ = "sale_offs"
    sale_off_id = Column(UUID, primary_key=True)
    sale_off_name = Column(String(50), nullable=False)
    sale_off = Column(Integer)
    time_start = Column(TIMESTAMP)
    time_end = Column(TIMESTAMP)
