from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

# from app.services.category_service import create_category, get_category, update_category, delete_category, get_category_by_name
from app.services.crud_service import CRUDService
from app.schemas.category import CategoryCreate, CategoryUpdate
from app.models.category import Category
from app.database.database import get_db
from uuid import UUID

router = APIRouter()
category_service = CRUDService[Category, CategoryCreate, CategoryUpdate](Category)
# @router.post("/create_category", summary="Create a new category")
# async def create_category_endpoint(category: CategoryCreate, db: AsyncSession = Depends(get_db)):
#     return await create_category(category, db)

# @router.get("/get_category/{category_id}", summary="Get a category by ID")
# async def get_category_endpoint(category_id: UUID, db: AsyncSession = Depends(get_db)):
#     return await get_category(category_id, db)

# @router.get("/get_category_by_name/{category_name}", summary="Get a category by name")
# async def get_category_by_name_endpoint(category_name: str, db: AsyncSession = Depends(get_db)):
#     category = await get_category_by_name(category_name, db)
#     if not category:
#         raise HTTPException(status_code=404, detail="Category not found")
#     return category

# @router.put("/update_category/{category_id}", summary="Update a category by ID")
# async def update_category_endpoint(category_id: UUID, category_update: CategoryUpdate, db: AsyncSession = Depends(get_db)):
#     return await update_category(category_id, category_update, db)

# @router.delete("/delete_category/{category_id}", summary="Delete a category by ID")
# async def delete_category_endpoint(category_id: UUID, db: AsyncSession = Depends(get_db)):
#     return await delete_category(category_id, db)


@router.post("/create_category", summary="Create a new category")
async def create_category_endpoint(
    category: CategoryCreate, db: AsyncSession = Depends(get_db)
):
    return await category_service.create(category, db)


@router.get("/get_category/{category_id}", summary="Get a category by ID")
async def get_category_endpoint(category_id: UUID, db: AsyncSession = Depends(get_db)):
    return await category_service.get_by_condition([{'id':category_id}], db)


@router.get("/get_category_by_name/{category_name}", summary="Get a category by name")
async def get_category_by_name_endpoint(
    category_name: str, db: AsyncSession = Depends(get_db)
):
    category = await category_service.get_by_condition([{'category_name':category_name}], db, 0)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.put("/update_category/{category_id}", summary="Update a category by ID")
async def update_category_endpoint(
    category_id: UUID,
    category_update: CategoryUpdate,
    db: AsyncSession = Depends(get_db),
):
    return await category_service.update(category_id, category_update, db)


@router.delete("/delete_category/{category_id}", summary="Delete a category by ID")
async def delete_category_endpoint(
    category_id: UUID, db: AsyncSession = Depends(get_db)
):
    return await category_service.delete(category_id, db)
