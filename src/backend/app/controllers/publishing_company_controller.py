from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.publishing_company_service import create_publishing_company
from app.schemas.publishing_company import Publishing_Company_Create

from app.database.database import get_db

router = APIRouter()

@router.post(
    "/create publishing_company",
    summary="Create a new publishing_company",
)
async def post_publishing_company(publishing_company: Publishing_Company_Create, db: AsyncSession = Depends(get_db)):
    await create_publishing_company(publishing_company, db)