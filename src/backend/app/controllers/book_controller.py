from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService

from app.services.book_service import get_books_ordered, get_books_filtered
from app.schemas.book import BookCreate, BookUpdate, BookResponse, BookOrder, BookFilter
from app.models.book import Book
from app.database.database import get_db
from uuid import UUID
from typing import List, Optional

router = APIRouter()
book_service = CRUDService[Book, BookCreate, BookUpdate](Book)

# @router.post("/create_book", summary="Create a new book")
# async def create_book_endpoint(book: BookCreate, db: AsyncSession = Depends(get_db)):
#     return await create_book(book, db)

# @router.get("/get_book/{book_id}", summary="Get a book by ID")
# async def get_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
#     book = await get_book(book_id, db)
#     if not book:
#         raise HTTPException(status_code=404, detail="Book not found")
#     return book

# @router.get("/get_book_by_name/{book_name}", summary="Get books by name")
# async def get_books_by_name_endpoint(book_name: str, db: AsyncSession = Depends(get_db)):
#     books = await get_books_by_name(book_name, db)
#     if not books:
#         raise HTTPException(status_code=404, detail="No books found with that name")
#     return books

# @router.put("/update_book/{book_id}", summary="Update a book by ID")
# async def update_book_endpoint(book_id: UUID, book_update: BookUpdate, db: AsyncSession = Depends(get_db)):
#     book = await update_book(book_id, book_update, db)
#     if not book:
#         raise HTTPException(status_code=404, detail="Book not found")
#     return book

# @router.delete("/delete_book/{book_id}", summary="Delete a book by ID")
# async def delete_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
#     book = await delete_book(book_id, db)
#     if not book:
#         raise HTTPException(status_code=404, detail="Book not found")
#     return book


@router.post("/create_book", summary="Create a new book")
async def create_book_endpoint(book: BookCreate, db: AsyncSession = Depends(get_db)):
    return await book_service.create(book, db)


@router.get("/get_book/{book_id}", summary="Get a book by ID")
async def get_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book = await book_service.get(book_id, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.get("/get_book_by_name/{book_name}", summary="Get books by name")
async def get_books_by_name_endpoint(
    book_name: str, db: AsyncSession = Depends(get_db)
):
    books = await book_service.get_by_name(book_name, [Book.book_name], db)
    if not books:
        raise HTTPException(status_code=404, detail="No books found with that name")
    return books


@router.put("/update_book/{book_id}", summary="Update a book by ID")
async def update_book_endpoint(
    book_id: UUID, book_update: BookUpdate, db: AsyncSession = Depends(get_db)
):
    book = await book_service.update(book_id, book_update, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.delete("/delete_book/{book_id}", summary="Delete a book by ID")
async def delete_book_endpoint(book_id: UUID, db: AsyncSession = Depends(get_db)):
    book = await book_service.delete(book_id, db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.get("/get_books_ordered", summary="Get books ordered")
async def get_books_ordered_endpoint(number_book: int, from_: int = 0, order_by: str = "default", db: AsyncSession = Depends(get_db)):
    books = await get_books_ordered(db, from_, number_book, order_by)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return books

# @router.get("/get_books_ordered", summary="Get books ordered")
# async def get_books_ordered_endpoint(order: BookOrder , db: AsyncSession = Depends(get_db)):
#     books = await get_books_ordered(db, order)
#     if not books:
#         raise HTTPException(status_code=404, detail="No books found")
#     return books

BOOK_PER_PAGE = 5

@router.get("/get_book_per_page/{page_number}", summary="Get books in page number")
async def get_book_per_page_endpoint(page_number: int, db: AsyncSession = Depends(get_db)):
    from_ = page_number * BOOK_PER_PAGE
    to_ = from_ + BOOK_PER_PAGE
    books = await get_books_ordered(db, from_, to_)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return books


# @router.get("/get_books_filtered", summary="Get books filtered")
# async def get_books_filtered_endpoint(filters: BookFilter, db: AsyncSession = Depends(get_db)):
#     books = await get_books_filtered(db, filters)
#     if not books:
#         raise HTTPException(status_code=404, detail="No books found")
#     return books