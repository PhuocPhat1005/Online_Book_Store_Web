from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.publishing_company import PublishingCompany
from app.schemas.publishing_company import Publishing_Company_Create
from fastapi import Depends, HTTPException
from app.config.config import settings
from app.database.database import get_db
import uuid

async def create_publishing_company(publishing_company: Publishing_Company_Create, db: AsyncSession):
    # Create a new publishing_company
    new_publishing_company = PublishingCompany(
        id=uuid.uuid4(),  # Generate a new UUID
        publishing_company_name = publishing_company.name,
    )
    db.add(new_publishing_company)
    try:
        # Flush changes to database
        await db.flush()
        # Commit the transaction
        await db.commit()
    except Exception as e:
        # Rollback the transaction if an error occurs
        await db.rollback()
        raise RuntimeError(f"Failed to create publishing_company: {e}") from e
    return new_publishing_company