# from sqlalchemy.future import select
# from sqlalchemy.ext.asyncio import AsyncSession
# from app.models.author import Author
# from app.schemas.author import AuthorCreate
# from fastapi import Depends, HTTPException
# from app.config.config import settings
# from jose import jwt, JWTError 
# from app.database.database import get_db


# async def create_author(db: AsyncSession, author: Author):
#     # Create a new author
#     new_author = author(
#         full_name=author.full_name,
#         pen_name=author.pen_name,
#         description=author.description,
#     )
#     db.add(new_author)
#     try:
#         # Flush changes to database
#         await db.flush()
#         # Commit the transaction
#         await db.commit()
#     except Exception as e:
#         # Rollback the transaction if an error occurs
#         await db.rollback()
#         raise RuntimeError(f"Failed to create book: {e}") from e
#     return new_author
