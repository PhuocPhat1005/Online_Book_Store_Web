from pydantic import BaseModel
from uuid import UUID

class PublishingCompanyBase(BaseModel):
    id: str | None = "empty_uuid"
    publishing_company_name: str | None = ""

class PublishingCompanyCreate(PublishingCompanyBase):
    pass

class PublishingCompanyUpdate(PublishingCompanyBase):
    pass

