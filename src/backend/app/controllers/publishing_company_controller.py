from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
# from app.services.publishing_company_service import create_publishing_company, get_publishing_company, update_publishing_company, delete_publishing_company, get_publishing_company_by_name
from app.services.crud_service import CRUDService
from app.schemas.publishing_company import PublishingCompanyCreate, PublishingCompanyUpdate, PublishingCompanyResponse
from app.models.publishing_company import PublishingCompany
from app.database.database import get_db
from uuid import UUID

router = APIRouter()
publishing_company_service = CRUDService[PublishingCompany, PublishingCompanyCreate, PublishingCompanyUpdate](PublishingCompany)
# @router.post("/create_publishing_company", summary="Create a new publishing company")
# async def create_publishing_company_endpoint(publishing_company: PublishingCompanyCreate, db: AsyncSession = Depends(get_db)):
#     return await create_publishing_company(publishing_company, db)

# @router.get("/get_publishing_company/{company_id}", summary="Get a publishing company by ID")
# async def get_publishing_company_endpoint(company_id: UUID, db: AsyncSession = Depends(get_db)):
#     company = await get_publishing_company(company_id, db)
#     if not company:
#         raise HTTPException(status_code=404, detail="Publishing company not found")
#     return company

# @router.get("/get_publishing_company_by_name/{company_name}", summary="Get a publishing company by name")
# async def get_publishing_company_by_name_endpoint(company_name: str, db: AsyncSession = Depends(get_db)):
#     company = await get_publishing_company_by_name(company_name, db)
#     if not company:
#         raise HTTPException(status_code=404, detail="Publishing company not found")
#     return company

# @router.put("/update_publishing_company/{company_id}", summary="Update a publishing company by ID")
# async def update_publishing_company_endpoint(company_id: UUID, publishing_company_update: PublishingCompanyUpdate, db: AsyncSession = Depends(get_db)):
#     company = await update_publishing_company(company_id, publishing_company_update, db)
#     if not company:
#         raise HTTPException(status_code=404, detail="Publishing company not found")
#     return company

# @router.delete("/delete_publishing_company/{company_id}", summary="Delete a publishing company by ID")
# async def delete_publishing_company_endpoint(company_id: UUID, db: AsyncSession = Depends(get_db)):
#     company = await delete_publishing_company(company_id, db)
#     if not company:
#         raise HTTPException(status_code=404, detail="Publishing company not found")
#     return company

@router.post("/create_publishing_company", summary="Create a new publishing company")
async def create_publishing_company_endpoint(publishing_company: PublishingCompanyCreate, db: AsyncSession = Depends(get_db)):
    return await publishing_company_service.create(publishing_company, db)

@router.get("/get_publishing_company/{company_id}", summary="Get a publishing company by ID")
async def get_publishing_company_endpoint(company_id: UUID, db: AsyncSession = Depends(get_db)):
    company = await publishing_company_service.get(company_id, db)
    if not company:
        raise HTTPException(status_code=404, detail="Publishing company not found")
    return company

@router.get("/get_publishing_company_by_name/{company_name}", summary="Get a publishing company by name")
async def get_publishing_company_by_name_endpoint(company_name: str, db: AsyncSession = Depends(get_db)):
    company = await publishing_company_service.get_by_one_value(company_name, [PublishingCompany.publishing_company_name], db, 0)
    if not company:
        raise HTTPException(status_code=404, detail="Publishing company not found")
    return company

@router.put("/update_publishing_company/{company_id}", summary="Update a publishing company by ID")
async def update_publishing_company_endpoint(company_id: UUID, publishing_company_update: PublishingCompanyUpdate, db: AsyncSession = Depends(get_db)):
    company = await publishing_company_service.update(company_id, publishing_company_update, db)
    if not company:
        raise HTTPException(status_code=404, detail="Publishing company not found")
    return company

@router.delete("/delete_publishing_company/{company_id}", summary="Delete a publishing company by ID")
async def delete_publishing_company_endpoint(company_id: UUID, db: AsyncSession = Depends(get_db)):
    company = await publishing_company_service.delete(company_id, db)
    if not company:
        raise HTTPException(status_code=404, detail="Publishing company not found")
    return company