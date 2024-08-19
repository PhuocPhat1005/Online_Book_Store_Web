from sqlalchemy import Column, String, Integer, TIMESTAMP
from app.database.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class SaleOff(Base):
    __tablename__ = "sale_offs"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    sale_off_name = Column(String(50), nullable=False)
    sale_off = Column(Integer)
    time_start = Column(TIMESTAMP)
    time_end = Column(TIMESTAMP)

    books = relationship("Book", back_populates="sale_offs")
    