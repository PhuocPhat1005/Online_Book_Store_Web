from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.category_service import create_category
from app.schemas.category import CategoryCreate

from app.database.database import get_db

router = APIRouter()

@router.post(
    "/create category",
    summary="Create a new category",
)
async def post_category(category: CategoryCreate, db: AsyncSession = Depends(get_db)):
    await create_category(category, db)