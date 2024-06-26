from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.book_service import create_book, get_book, update_book, delete_book, get_books_by_name
from app.schemas.book import BookCreate, BookUpdate, BookResponse

from app.database.database import get_db
from uuid import UUID

router = APIRouter()

@router.post("/create_book", summary="Create a new book")
async def create_book_endpoint(book: BookCreate, db: AsyncSession = Depends(get_db)):
    return await create_book(book, db)

@router.get("/get_book/{book_id}", summary="Get a book by ID")
async def get_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book = await get_book(book_id, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.get("/get_book_by_name/{book_name}", summary="Get books by name")
async def get_books_by_name_endpoint(book_name: str, db: AsyncSession = Depends(get_db)):
    books = await get_books_by_name(book_name, db)
    if not books:
        raise HTTPException(status_code=404, detail="No books found with that name")
    return books

@router.put("/update_book/{book_id}", summary="Update a book by ID")
async def update_book_endpoint(book_id: UUID, book_update: BookUpdate, db: AsyncSession = Depends(get_db)):
    book = await update_book(book_id, book_update, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.delete("/delete_book/{book_id}", summary="Delete a book by ID")
async def delete_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book = await delete_book(book_id, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book