from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.CRUDService.crud_service import (
    CRUDService,
    get_user_obj_by_token,
    UpdateService,
    ReadService,
    CreateService
)
from app.models.admin import Admin
from app.models.order import Order
from app.models.book import Book
from app.models.user import User
from app.models.account import Account
from app.models.order_detail import OrderDetail
from app.schemas.AccountSchemas.account import AdminCreate
from app.schemas.OrderSchemas.order import OrderUpdate
from app.schemas.BookSchemas.book import BookUpdate
from app.schemas.AccountSchemas.account import AccountBanned
from app.controllers.AddressController.address_controller import get_address_by_user_id
from app.database.database import get_db
from uuid import UUID
from datetime import datetime
from app.utils.security import get_password_hash
router = APIRouter()


@router.put("/approval_orders", summary="Approval orders")
async def Approval_orders(
    order_id: str, order_status: str, db: AsyncSession = Depends(get_db)
):
    update_order_service = UpdateService[Order, OrderUpdate](Order)
    order_update = OrderUpdate()
    order_update.status = order_status
    await update_order_service.update({"id": order_id}, order_update, db)
    if order_status == "Done":
        read_order_details_service = ReadService[OrderDetail](OrderDetail)
        order_details = await read_order_details_service.get_by_condition(
            [{"order_id": order_id}], db
        )
        read_book_service = ReadService[Book](Book)
        update_book_service = UpdateService[Book, BookUpdate](Book)
        for order_detail in order_details:
            books = await read_book_service.get_by_condition(
                [{"id": order_detail.book_id}], db
            )
            if not books:
                raise HTTPException(status_code=404, detail="Book not found")
            book = books[0]
            book_update = BookUpdate()
            book_update.amount_sell = book.amount_sell + order_detail.quantity
            await update_book_service.update(
                {"id": order_detail.book_id}, book_update, db
            )
    return {"id": order_id, "status": order_status}


@router.get("/show_all_orders", summary="Show all orders")
async def Show_all_orders(db: AsyncSession = Depends(get_db)):
    read_order_service = ReadService[Order](Order)
    orders = await read_order_service.get_by_condition([{"id": ""}], db, 0)
    if not orders:
        raise HTTPException(status_code=404, detail="Orders not found")
    return orders


@router.get("/view_revenue", summary="View revenue")
async def View_revenue(db: AsyncSession = Depends(get_db)):
    read_order_service = ReadService[Order](Order)
    orders = await read_order_service.get_by_condition([{"status": "Done"}], db)
    revenue = 0
    user_count = {}
    book_count = {}
    for order in orders:
        revenue += order.total_price
        user_count[order.user_id] = (
            1
            if user_count.get(order.user_id) is None
            else user_count[order.user_id] + 1
        )

        read_order_details_service = ReadService[OrderDetail](OrderDetail)
        order_details = await read_order_details_service.get_by_condition(
            [{"order_id": order.id}], db
        )
        for order_detail in order_details:
            book_count[order_detail.book_id] = (
                order_detail.quantity
                if book_count.get(order_detail.book_id) is None
                else book_count[order_detail.book_id] + order_detail.quantity
            )
    return {"revenue": revenue, "user_count": user_count, "book_count": book_count}


@router.get("/show_top_10_best_selling_books", summary="Show Top 10 best selling books")
async def Show_Top_best_selling_books(db: AsyncSession = Depends(get_db)):
    read_book_service = ReadService[Book](Book)
    books = await read_book_service.get_by_condition(
        [{"id": ""}], db, 0, 0, 10, "amount_sell"
    )
    if not books:
        raise HTTPException(status_code=404, detail="Books not found")
    # return await read_book_service.get_ordered(books, "amount_sell")
    return books


@router.get("/show_list_users", summary="Show list users")
async def show_list_users(db: AsyncSession = Depends(get_db)):
    read_account_service = ReadService[Account](Account)
    accounts = await read_account_service.get_by_condition([{"id": ""}], db, 0)
    if not accounts:
        raise HTTPException(status_code=404, detail="Accounts not found")
    account_arr = []
    list_user = []
    for account in accounts:
        account_arr.append((account.id, account.username, account.email, account.banned_to))
    for account_id, user_name, email, account_banned_to in account_arr:
        read_user_service = ReadService[User](User)
        users = await read_user_service.get_by_condition([{"account_id": account_id}], db)
        user = users[0]
        list_user.append(
            {
                "id": account_id,
                "user_id": user.id,
                "full_name": user.full_name,
                "username": user_name,
                "address": "",
                "email": email,
                "phone": user.phone,
                "created_at": user.created_at,
                "updated_at": user.updated_at,
                "banned_to": account_banned_to
            }
        )
    for user in list_user:
        address = await get_address_by_user_id(user["user_id"], db)
        if address:
            address = address[0]
            user["address"] = f"{address['address']}, {address['ward']}, {address['district']}, {address['province']}, {address['country']}"
        
    return list_user
        
@router.put("/ban_user", summary="Ban user")
async def ban_user(account_banned: AccountBanned, db: AsyncSession = Depends(get_db)):
    if account_banned.banned_to < datetime.now() or account_banned.banned_to is None:
        raise HTTPException(status_code=400, detail="Invalid banned time")
    update_account_service = UpdateService[Account, AccountBanned](Account)
    return await update_account_service.update({"id": account_banned.id}, account_banned, db)

@router.post('/test_create_admin', summary="Test create admin")
async def test_create_admin(admin_create: AdminCreate, db: AsyncSession = Depends(get_db)):
    create_admin_service = CreateService[Admin, AdminCreate](Admin)
    admin_create.password_hash = get_password_hash(admin_create.password_hash)
    return await create_admin_service.create(admin_create, db)

# @router.get('/test_show_admin_list', summary="Test show admin list")
# async def test_show_admin_list(db: AsyncSession = Depends(get_db)):
#     read_admin_service = ReadService[Admin](Admin)
#     return await read_admin_service.get_by_condition([{"id": ""}], db, 0)