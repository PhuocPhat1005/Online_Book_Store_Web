from sqlalchemy import Column, String, UUID
from ..engine import Base

class PublishingCompany(Base):
    __tablename__ = 'publishing_companies'
    publishing_company_id = Column(UUID, primary_key=True)
    publishing_company_name = Column(String(255), nullable=False)
