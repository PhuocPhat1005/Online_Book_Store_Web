from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.publishing_company_service import create_publishing_company, get_publishing_company, update_publishing_company, delete_publishing_company, get_publishing_company_by_name
from app.schemas.publishing_company import PublishingCompanyCreate, PublishingCompanyUpdate, PublishingCompanyResponse

from app.database.database import get_db
from uuid import UUID

router = APIRouter()

@router.post("/publishing_companies", summary="Create a new publishing company")
async def create_publishing_company_endpoint(publishing_company: PublishingCompanyCreate, db: AsyncSession = Depends(get_db)):
    return await create_publishing_company(publishing_company, db)

@router.get("/publishing_companies/{company_id}", summary="Get a publishing company by ID")
async def get_publishing_company_endpoint(company_id: UUID, db: AsyncSession = Depends(get_db)):
    company = await get_publishing_company(company_id, db)
    if not company:
        raise HTTPException(status_code=404, detail="Publishing company not found")
    return company

@router.get("/publishing_companies/name/{company_name}", summary="Get a publishing company by name")
async def get_publishing_company_by_name_endpoint(company_name: str, db: AsyncSession = Depends(get_db)):
    company = await get_publishing_company_by_name(company_name, db)
    if not company:
        raise HTTPException(status_code=404, detail="Publishing company not found")
    return company

@router.put("/publishing_companies/{company_id}", summary="Update a publishing company by ID")
async def update_publishing_company_endpoint(company_id: UUID, publishing_company_update: PublishingCompanyUpdate, db: AsyncSession = Depends(get_db)):
    company = await update_publishing_company(company_id, publishing_company_update, db)
    if not company:
        raise HTTPException(status_code=404, detail="Publishing company not found")
    return company

@router.delete("/publishing_companies/{company_id}", summary="Delete a publishing company by ID")
async def delete_publishing_company_endpoint(company_id: UUID, db: AsyncSession = Depends(get_db)):
    company = await delete_publishing_company(company_id, db)
    if not company:
        raise HTTPException(status_code=404, detail="Publishing company not found")
    return company