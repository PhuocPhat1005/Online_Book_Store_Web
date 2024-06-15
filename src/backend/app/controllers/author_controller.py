from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from requests import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from authlib.integrations.starlette_client import OAuth, OAuthError
from starlette.requests import Request
from app.schemas.token import Token
from app.schemas.author import AuthorCreate
from app.services.author_service import (
    create_author
)
from app.database.database import get_db
from app.config.config import settings
import uuid
from uuid import uuid4

router = APIRouter()

def get_session(request: Request):
    return request.session


# CRUD operations

# Create 
@router.post("/Create_author")
async def create_item(author: AuthorCreate, db: AsyncSession = Depends(get_db)):
    await create_author(db, author)