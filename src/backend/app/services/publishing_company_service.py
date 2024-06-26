from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.publishing_company import PublishingCompany
from app.schemas.publishing_company import PublishingCompanyCreate, PublishingCompanyUpdate, PublishingCompanyResponse
from fastapi import Depends, HTTPException
from app.config.config import settings
from app.database.database import get_db
import uuid

# Create
# async def create_publishing_company(publishing_company: PublishingCompanyCreate, db: AsyncSession):
#     new_publishing_company = PublishingCompany(
#         id=uuid.uuid4(),  # Generate a new UUID
#         publishing_company_name=publishing_company.publishing_company_name
#     )
#     db.add(new_publishing_company)
#     try:
#         await db.flush()
#         await db.commit()
#     except Exception as e:
#         await db.rollback()
#         raise RuntimeError(f"Failed to create publishing company: {e}") from e
#     return new_publishing_company

# # Read
# async def get_publishing_company(company_id: uuid.UUID, db: AsyncSession):
#     result = await db.execute(select(PublishingCompany).where(PublishingCompany.id == company_id))
#     company = result.scalars().first()
#     if not company:
#         raise HTTPException(status_code=404, detail="Publishing company not found")
#     return company


# # Read by name
# async def get_publishing_company_by_name(company_name: str, db: AsyncSession):
#     result = await db.execute(select(PublishingCompany).where(PublishingCompany.publishing_company_name == company_name))
#     company = result.scalars().first()
#     if not company:
#         raise HTTPException(status_code=404, detail="Publishing company not found")
#     return company


# # Update
# async def update_publishing_company(company_id: uuid.UUID, company_update: PublishingCompanyUpdate, db: AsyncSession):
#     result = await db.execute(select(PublishingCompany).where(PublishingCompany.id == company_id))
#     company = result.scalars().first()
#     if not company:
#         raise HTTPException(status_code=404, detail="Publishing company not found")
    
#     company.publishing_company_name = company_update.publishing_company_name

#     try:
#         await db.flush()
#         await db.commit()
#     except Exception as e:
#         await db.rollback()
#         raise RuntimeError(f"Failed to update publishing company: {e}") from e

#     return company

# # Delete
# async def delete_publishing_company(company_id: uuid.UUID, db: AsyncSession):
#     result = await db.execute(select(PublishingCompany).where(PublishingCompany.id == company_id))
#     company = result.scalars().first()
#     if not company:
#         raise HTTPException(status_code=404, detail="Publishing company not found")

#     try:
#         await db.delete(company)
#         await db.commit()
#     except Exception as e:
#         await db.rollback()
#         raise RuntimeError(f"Failed to delete publishing company: {e}") from e

#     return {"message": "Publishing company deleted successfully"}