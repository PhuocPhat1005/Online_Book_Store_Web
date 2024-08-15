from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService
from app.schemas.author import AuthorCreate, AuthorUpdate, AuthorResponse
from app.models.author import Author
from app.database.database import get_db
from uuid import UUID
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
author_service = CRUDService[Author, AuthorCreate, AuthorUpdate](Author)

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/create_author", summary="Create a new author")
async def create_author_endpoint(
    author: AuthorCreate,
    db: AsyncSession = Depends(get_db),
    # admin_check: None = Depends(check_admin)
):
    return await author_service.create(author, db)
    # if(admin_check):
    #     return await author_service.create(author, db)
    # else:
    #     raise HTTPException(status_code=403, detail="Not authorized")
    
@router.get("/get_author/{author_id}", summary="Get a Author by ID")
async def get_author_endpoint(author_id: UUID, db: AsyncSession = Depends(get_db)):
    author = await author_service.get_by_condition({{'id':author_id}}, db)
    if not author:
        raise HTTPException(status_code=404, detail="author not found")
    return author

@router.get("/get_author_by_name/{author_name}", summary="Get authors by name")
async def get_authors_by_name_endpoint(author_name: str, db: AsyncSession = Depends(get_db)):
    authors = await author_service.get_by_condition([{},{'full_name':author_name, 'pen_name': author_name}], db, 0)
    if not authors:
        raise HTTPException(status_code=404, detail="No authors found with that name")
    return authors

@router.put("/update_author/{author_id}", summary="Update a author by ID")
async def update_author_endpoint(author_id: UUID, author_update: AuthorUpdate, db: AsyncSession = Depends(get_db)):
    author = await author_service.update(author_id, author_update, db)
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    return author

@router.delete("/delete_author/{author_id}", summary="Delete a author by ID")
async def delete_author_endpoint(author_id: UUID, db: AsyncSession = Depends(get_db)):
    author = await author_service.delete(author_id, db)
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    return author