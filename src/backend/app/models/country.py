from sqlalchemy import Column, String
from app.database.database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Country(Base):
    __tablename__ = "countries"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    country_name = Column(String(255), nullable=False)
