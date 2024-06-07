from sqlalchemy import Column, String
from app.database.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID


class Store(Base):
    __tablename__ = "stores"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    store_name = Column(String(255), nullable=False)
    phone = Column(String(15), nullable=False)
