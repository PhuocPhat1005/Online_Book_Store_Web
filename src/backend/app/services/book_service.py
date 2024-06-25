from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.book import Book
from app.schemas.book import BookCreate
from fastapi import Depends, HTTPException
from app.config.config import settings
from app.database.database import get_db
import uuid

async def create_book(book: BookCreate, db: AsyncSession):
    # Create a new book
    new_book = Book(
        id=uuid.uuid4(),  # Generate a new UUID
        book_name = book.book_name,
        isbn = book.isbn,
        publishing_company_id = book.publishing_company_id if book.publishing_company_id else None, 
        category_id = book.category_id if book.category_id else None,
        publishing_date = book.publishing_date, 
        price = book.price, 
        language = book.language, 
        book_size = book.book_size, 
        page_number = book.page_number, 
        book_cover_type = book.book_cover_type, 
        description = book.description 
    )
    db.add(new_book)
    # db.add(book_author)
    try:
        # Flush changes to database
        await db.flush()
        # Commit the transaction
        await db.commit()
    except Exception as e:
        # Rollback the transaction if an error occurs
        await db.rollback()
        raise RuntimeError(f"Failed to create book: {e}") from e
    return new_book