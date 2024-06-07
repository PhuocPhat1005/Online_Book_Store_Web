from sqlalchemy import Column, String, Integer, TIMESTAMP
from app.database.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID


class Voucher(Base):
    __tablename__ = "vouchers"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    code = Column(String(50), nullable=False, unique=True)
    discount = Column(Integer, nullable=False)
    valid_from = Column(TIMESTAMP, nullable=False)
    valid_to = Column(TIMESTAMP, nullable=False)
