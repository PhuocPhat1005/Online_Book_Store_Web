from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService, query_string_to_dict

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
    books = await book_service.get_by_one_value(book_name, [Book.book_name], db, 0)
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

BOOK_PER_PAGE = 5
ORDER_BY = "created_at"

@router.get("/get_book_per_page/{page_number}", summary="Get books in page number")
async def get_book_per_page_endpoint(page_number: int, db: AsyncSession = Depends(get_db)):
    from_ = (page_number - 1) * BOOK_PER_PAGE
    books = await book_service.get_by_one_value('', [Book.book_name], db, 0)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return await book_service.get_ordered(books, ORDER_BY, True, from_, amount_= BOOK_PER_PAGE)

@router.get("/get_book_by_conditions", description="Input a string to filter book. EX: book_name=string&book_size=string&price=0", summary="Get books with many conditions", )
async def get_book_by_condition_endpoint(search_params: str, db: AsyncSession = Depends(get_db)):
    books = await book_service.get_by_many_value(query_string_to_dict(search_params), db, 1)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return await book_service.get_ordered(books, ORDER_BY)

@router.get("/get_all_fields", summary="Get all fields of book")
async def get_all_fields_endpoint(db: AsyncSession = Depends(get_db)):
    return await book_service.get_by_one_value('', [Book.book_name], db, 0,limit=1)