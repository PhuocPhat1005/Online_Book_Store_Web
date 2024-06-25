from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.category import Category
from app.schemas.category import CategoryCreate
from fastapi import Depends, HTTPException
from app.config.config import settings
from app.database.database import get_db
import uuid

async def create_category(category: CategoryCreate, db: AsyncSession):
    # Create a new category
    new_category = Category(
        id=uuid.uuid4(),  # Generate a new UUID
        category_name = category.name,
        parent_category_id = category.parent_id if category.parent_id else None,
        description = category.description
    )
    db.add(new_category)
    try:
        # Flush changes to database
        await db.flush()
        # Commit the transaction
        await db.commit()
    except Exception as e:
        # Rollback the transaction if an error occurs
        await db.rollback()
        raise RuntimeError(f"Failed to create category: {e}") from e
    return new_category