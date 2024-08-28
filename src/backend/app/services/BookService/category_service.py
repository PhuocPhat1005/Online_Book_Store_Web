from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.category import Category
from src.backend.app.schemas.BookSchemas.category import CategoryCreate, CategoryUpdate
from fastapi import Depends, HTTPException
from app.config.config import settings
from app.database.database import get_db
import uuid

# # Create
# async def create_category(category: CategoryCreate, db: AsyncSession):
#     new_category = Category(
#         id=uuid.uuid4(),  # Generate a new UUID
#         category_name=category.name,
#         parent_category_id=category.parent_id,
#         description=category.description
#     )
#     db.add(new_category)
#     try:
#         await db.flush()
#         await db.commit()
#     except Exception as e:
#         await db.rollback()
#         raise RuntimeError(f"Failed to create category: {e}") from e
#     return new_category

# # Read
# async def get_category(category_id: uuid.UUID, db: AsyncSession):
#     result = await db.execute(select(Category).where(Category.id == category_id))
#     category = result.scalars().first()
#     if not category:
#         raise HTTPException(status_code=404, detail="Category not found")
#     return category

# # Read by name
# async def get_category_by_name(category_name: str, db: AsyncSession):
#     result = await db.execute(select(Category).where(Category.category_name == category_name))
#     category = result.scalars().first()
#     if not category:
#         raise HTTPException(status_code=404, detail="Category not found")
#     return category

# # Update
# async def update_category(category_id: uuid.UUID, category_update: CategoryUpdate, db: AsyncSession):
#     result = await db.execute(select(Category).where(Category.id == category_id))
#     category = result.scalars().first()
#     if not category:
#         raise HTTPException(status_code=404, detail="Category not found")

#     category.category_name = category_update.name
#     category.parent_category_id = category_update.parent_id
#     category.description = category_update.description

#     try:
#         await db.flush()
#         await db.commit()
#     except Exception as e:
#         await db.rollback()
#         raise RuntimeError(f"Failed to update category: {e}") from e

#     return category

# # Delete
# async def delete_category(category_id: uuid.UUID, db: AsyncSession):
#     result = await db.execute(select(Category).where(Category.id == category_id))
#     category = result.scalars().first()
#     if not category:
#         raise HTTPException(status_code=404, detail="Category not found")

#     try:
#         await db.delete(category)
#         await db.commit()
#     except Exception as e:
#         await db.rollback()
#         raise RuntimeError(f"Failed to delete category: {e}") from e

#     return {"message": "Category deleted successfully"}
