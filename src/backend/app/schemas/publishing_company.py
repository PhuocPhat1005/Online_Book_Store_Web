from pydantic import BaseModel
from uuid import UUID

class PublishingCompanyBase(BaseModel):
    publishing_company_name: str

class PublishingCompanyCreate(PublishingCompanyBase):
    pass

class PublishingCompanyUpdate(PublishingCompanyBase):
    pass

class PublishingCompanyResponse(PublishingCompanyBase):
    id: UUID

