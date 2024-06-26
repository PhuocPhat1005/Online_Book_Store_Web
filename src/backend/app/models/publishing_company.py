from sqlalchemy import Column, String
from app.database.database import Base
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.dialects.postgresql import UUID


class PublishingCompany(Base):
    __tablename__ = "publishing_companies"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    publishing_company_name = Column(String(255), unique = True, nullable=False)

    books = relationship("Book", back_populates="publishing_company")
