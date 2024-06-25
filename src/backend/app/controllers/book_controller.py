from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.book_service import create_book
from app.schemas.book import BookCreate

from app.database.database import get_db

router = APIRouter()

@router.post(
    "/create book",
    summary="Create a new book",
)
async def post_book(book: BookCreate, db: AsyncSession = Depends(get_db)):
    await create_book(book, db)
    # await create_book_author()