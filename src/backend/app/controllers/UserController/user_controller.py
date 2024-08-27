from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService
from app.schemas.user import UserCreate, UserUpdate, UserResponse, UserBase
from app.models.user import User
from app.models.account import Account
from app.database.database import get_db
from uuid import UUID
from sqlalchemy import select

import random

router = APIRouter()
user_service = CRUDService[User, UserCreate, UserUpdate](User)
# @router.post("/create_user", summary="Create a new user")
# async def create_user_endpoint(user: UserCreate, db: AsyncSession = Depends(get_db)):
#     return await user_service.create(user, db)

def get_num():
    return random.randint(1, 100)
def get_image():
    return [r"database\image\User\img1.jpg", r"database\image\User\img2.jpg"]

@router.get("/get_user_profile/{user_id}", summary="Get profile of a user by ID")
async def get_user_endpoint(user_id: UUID, db: AsyncSession = Depends(get_db)):
    user = await user_service.get_by_condition([{'id':user_id}], db)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    
    account_id = user[0].account_id
    query = select(Account.email, Account.username).where(Account.id == account_id)
    result = await db.execute(query)
    db_objs = result.fetchall()
    
    user_base = UserResponse(**user[0].__dict__)
    profile = {
        "username": db_objs[0].username,
        "email": db_objs[0].email,
        **user_base.dict(),  # Convert UserBase to a dictionary
        "photo_path": get_image(),
        "products": get_num(),
        "comments": get_num(),
        "starts": get_num(),
    }
    return profile

@router.get("/get_user_by_name/{user_name}", summary="Get users by name")
async def get_users_by_name_endpoint(user_name: str, db: AsyncSession = Depends(get_db)):
    users = await user_service.get_by_condition([{'full_name':user_name}], db, 0)
    if not users:
        raise HTTPException(status_code=404, detail="No users found with that name")
    profiles = []
    for user in users:
        account_id = user.account_id
        query = select(Account.email, Account.username).where(Account.id == account_id)
        result = await db.execute(query)
        db_objs = result.fetchall()
        
        user_base = UserResponse(**user.__dict__)
        profile = {
            "username": db_objs[0].username,
            "email": db_objs[0].email,
            **user_base.dict(),  # Convert UserBase to a dictionary
            "photo_path": get_image(),
            "products": get_num(),
            "comments": get_num(),
            "starts": get_num(),
        }
        profiles.append(profile)
    return profiles

@router.put("/update_user/{user_id}", summary="Update a user by ID")
async def update_user_endpoint(user_id: UUID, user_update: UserUpdate, db: AsyncSession = Depends(get_db)):
    user = await user_service.update(user_id, user_update, db)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    return user

# @router.delete("/delete_user/{user_id}", summary="Delete a user by ID")
# async def delete_user_endpoint(user_id: UUID, db: AsyncSession = Depends(get_db)):
#     user = await user_service.delete(user_id, db)
#     if not user:
#         raise HTTPException(status_code=404, detail="user not found")
#     return user