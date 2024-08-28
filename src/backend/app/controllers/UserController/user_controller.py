from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.CRUDService.crud_service import CRUDService, query_in_db_by_id, ReadService
from app.schemas.UserSchemas.user import UserCreate, UserUpdate, UserResponse, UserBase
from app.models.user import User
from app.models.account import Account
from app.models.order import Order
from app.database.database import get_db
from uuid import UUID
from sqlalchemy import select

import random

router = APIRouter()
user_service = CRUDService[User, UserCreate, UserUpdate](User)
# @router.post("/create_user", summary="Create a new user")
# async def create_user_endpoint(user: UserCreate, db: AsyncSession = Depends(get_db)):
#     return await user_service.create(user, db)

@router.get("/get_user_profile/{user_id}", summary="Get profile of a user by ID")
async def get_user_endpoint(user_id: str, db: AsyncSession = Depends(get_db)):
    user = await query_in_db_by_id(db, User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    account_id = user[0].account_id
    account = await query_in_db_by_id(db, Account, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    read_order_service = ReadService[Order](Order)
    orders = await read_order_service.get_by_condition([{"user_id": user_id}], db)
    num_orders = len(orders)
    profile = {
        "full_name": user[0].full_name,
        "username": account[0].username,
        "email": account[0].email,
        "phone": user[0].phone,
        "num_orders": num_orders
    }
    return profile


@router.put("/update_user_profile/{user_id}", summary="Update profile of a user by ID")
async def update_user_endpoint(user_id: str, user: UserUpdate, db: AsyncSession = Depends(get_db)):
    user = await user_service.update({'id': user_id}, user, db)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    return user


# @router.delete("/delete_user/{user_id}", summary="Delete a user by ID")
# async def delete_user_endpoint(user_id: UUID, db: AsyncSession = Depends(get_db)):
#     user = await user_service.delete(user_id, db)
#     if not user:
#         raise HTTPException(status_code=404, detail="user not found")
#     return user
