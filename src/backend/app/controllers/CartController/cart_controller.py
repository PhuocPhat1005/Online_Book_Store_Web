from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.CRUDService.crud_service import (
    CRUDService,
    ReadService,
    get_user_obj_by_token,
)
from app.schemas.CartSchemas.cart import CartCreate, CartUpdate
from app.models.cart import Cart
from app.models.user import User
from app.models.account import Account
from app.database.database import get_db
from uuid import UUID

router = APIRouter()
cart_service = CRUDService[Cart, CartCreate, CartUpdate](Cart)
read_user_service = ReadService[User](User)


async def get_cart_id_by_token(access_token: str, db: AsyncSession):
    user_obj = await get_user_obj_by_token(access_token, db)
    user_id = user_obj.id
    user = await read_user_service.get_by_condition([{"id": user_id}], db)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    cart_id = user[0].cart_id
    return cart_id


@router.post("/add_to_cart", summary="Add new book to cart")
async def create_book_cart_endpoint(
    access_token: str, book_id: UUID, db: AsyncSession = Depends(get_db)
):
    cart_id = await get_cart_id_by_token(access_token, db)
    cart = CartCreate()
    cart.id = cart_id
    cart.book_id = book_id
    cart.amount = 1
    book_in_cart = await cart_service.get_by_condition(
        [{"id": cart_id, "book_id": book_id}], db
    )
    if book_in_cart:
        cart_update = CartUpdate()
        cart_update.id = cart_id
        cart_update.book_id = book_id
        cart_update.amount = book_in_cart[0].amount + 1
        return await cart_service.update(
            {"id": cart_id, "book_id": book_id}, cart_update, db
        )
    return await cart_service.create(cart, db, 0)


@router.get("/show_book_in_cart", summary="Show a Cart by User ID")
async def show_cart_endpoint(access_token: str, db: AsyncSession = Depends(get_db)):
    cart_id = await get_cart_id_by_token(access_token, db)
    cart = await cart_service.get_by_condition([{"id": cart_id}], db)
    if not cart:
        raise HTTPException(status_code=404, detail="Can't find cart to show")
    return cart


@router.put("/update_cart", summary="Update book in cart of user")
async def update_cart_endpoint(
    access_token: str, book_id: UUID, amount: int, db: AsyncSession = Depends(get_db)
):
    cart_id = await get_cart_id_by_token(access_token, db)
    cart = await cart_service.get_by_condition([{"id": cart_id}], db)
    if not cart:
        raise HTTPException(status_code=404, detail="Can't find cart to show")
    cart_update = CartUpdate()
    cart_update.id = cart_id
    cart_update.book_id = book_id
    cart_update.amount = amount
    return await cart_service.update(
        {"id": cart_id, "book_id": book_id}, cart_update, db
    )


@router.delete("/delete_book_in_cart", summary="Delete book in cart of user")
async def delete_book_endpoint(
    access_token: str, book_id: UUID, db: AsyncSession = Depends(get_db)
):
    cart_id = await get_cart_id_by_token(access_token, db)
    return await cart_service.delete({"id": cart_id, "book_id": book_id}, db)
