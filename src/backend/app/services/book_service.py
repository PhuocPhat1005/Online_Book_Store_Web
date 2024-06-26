from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.book import Book
from app.schemas.book import BookCreate, BookUpdate, BookResponse
from fastapi import Depends, HTTPException
from app.config.config import settings
from app.database.database import get_db
import uuid

async def create_book(book: BookCreate, db: AsyncSession):
    new_book = Book(
        id=uuid.uuid4(),  # Generate a new UUID
        book_name=book.book_name,
        isbn=book.isbn,
        publishing_company_id=book.publishing_company_id,
        category_id=book.category_id,
        publishing_date=book.publishing_date,
        price=book.price,
        language=book.language,
        book_size=book.book_size,
        page_number=book.page_number,
        book_cover_type=book.book_cover_type,
        description=book.description
    )
    db.add(new_book)
    try:
        await db.flush()
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise RuntimeError(f"Failed to create book: {e}") from e
    return new_book

# Read by ID
async def get_book(book_id: uuid.UUID, db: AsyncSession):
    result = await db.execute(select(Book).where(Book.id == book_id))
    book = result.scalars().first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

# Read by name
async def get_books_by_name(book_name: str, db: AsyncSession):
    result = await db.execute(select(Book).where(Book.book_name == book_name))
    books = result.scalars().all()
    if not books:
        raise HTTPException(status_code=404, detail="No books found with that name")
    return books

# Update
async def update_book(book_id: uuid.UUID, book_update: BookUpdate, db: AsyncSession):
    result = await db.execute(select(Book).where(Book.id == book_id))
    book = result.scalars().first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    book.book_name = book_update.book_name
    book.isbn = book_update.isbn
    book.publishing_company_id = book_update.publishing_company_id
    book.category_id = book_update.category_id
    book.publishing_date = book_update.publishing_date
    book.price = book_update.price
    book.language = book_update.language
    book.book_size = book_update.book_size
    book.page_number = book_update.page_number
    book.book_cover_type = book_update.book_cover_type
    book.description = book_update.description

    try:
        await db.flush()
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise RuntimeError(f"Failed to update book: {e}") from e

    return book

# Delete
async def delete_book(book_id: uuid.UUID, db: AsyncSession):
    result = await db.execute(select(Book).where(Book.id == book_id))
    book = result.scalars().first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    try:
        await db.delete(book)
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise RuntimeError(f"Failed to delete book: {e}") from e

    return {"message": "Book deleted successfully"}