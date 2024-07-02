from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.book import Book
from app.schemas.book import BookCreate, BookUpdate, BookResponse, BookOrder
from fastapi import Depends, HTTPException
from app.config.config import settings
from app.database.database import get_db
from sqlalchemy import func, asc, desc
from sqlalchemy import Column
from typing import Any


# async def get_books_ordered(db: AsyncSession, from_: int = 0, to_: int = 1, order_by: str = "default") -> list[Book]:
#     order_field_map = {
#         "default": desc(Book.updated_at),     # Default ordering field
#         "random": func.random(),
#         "newer": desc(Book.publishing_date),  # Assuming 'publishing_date' is a column
#         "older": asc(Book.publishing_date),   # Assuming 'publishing_date' is a column
#         "cost": asc(Book.price),              # Assuming 'price' is a column
#         "cheaper": desc(Book.price),          # Assuming 'price' is a column
#         # "rating": desc(Book.rating)         # Assuming 'rating' is a column
#     }
    
#     if order_by not in order_field_map:
#         raise HTTPException(status_code=400, detail="Invalid order_by value")

#     order_clause = order_field_map[order_by]

#     query = select(Book).order_by(order_clause).offset(from_).limit(to_)
    
#     result = await db.execute(query)
#     db_objs = result.scalars().all()
    
#     if not db_objs:
#         raise HTTPException(status_code=404, detail="Books not found")
    
#     return db_objs

# async def get_ordered_books(db: AsyncSession,order: BookOrder) -> list[Book]:
#     order_field_map = {
#         "default": desc(Book.updated_at),     # Default ordering field
#         "random": func.random(),
#         "newer": desc(Book.publishing_date),  # Assuming 'publishing_date' is a column
#         "older": asc(Book.publishing_date),   # Assuming 'publishing_date' is a column
#         "cost": asc(Book.price),              # Assuming 'price' is a column
#         "cheaper": desc(Book.price),          # Assuming 'price' is a column
#         # "rating": desc(Book.rating)         # Assuming 'rating' is a column
#     }
    
#     if order.order_by not in order_field_map:
#         raise HTTPException(status_code=400, detail="Invalid order_by value")

#     order_clause = order_field_map[order.order_by]

#     query = select(Book).order_by(order_clause).offset(order.from_).limit(order.n)
    
#     result = await db.execute(query)
#     db_objs = result.scalars().all()
    
#     if not db_objs:
#         raise HTTPException(status_code=404, detail="Books not found")
    
#     return db_objs

async def get_books_filtered(db: AsyncSession, filters: dict[Column, Any] = None) -> list[Book]:
    # Start with a base query selecting from the Book model
    query = select(Book)
    
    # Apply filters if provided
    if filters:
        for field, value in filters.items():
            query = query.where(field == value)
    
    # Execute the query
    result = await db.execute(query)
    db_objs = result.scalars().all()
    
    # Check if any results were found
    if not db_objs:
        raise HTTPException(status_code=404, detail="Books not found")
    
    return db_objs