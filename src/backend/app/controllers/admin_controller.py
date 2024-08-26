from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService, get_user_obj_by_token, UpdateService, ReadService
from app.models.order import Order
from app.models.book import Book
from app.models.user import User
from app.models.account import Account
from app.models.order_detail import OrderDetail
from app.schemas.order import OrderUpdate
from app.schemas.book import BookUpdate
from app.schemas.account import AccountBanned
from app.database.database import get_db
from uuid import UUID

router = APIRouter()

@router.put("/Approval orders", summary="Approval orders")
async def Approval_orders(order_id: str, order_status: str, db: AsyncSession = Depends(get_db)):
    update_order_service = UpdateService[Order, OrderUpdate](Order)
    order_update = OrderUpdate()
    order_update.status = order_status
    await update_order_service.update({'id': order_id}, order_update, db)
    if order_status == 'Done':
        read_order_details_service = ReadService[OrderDetail](OrderDetail)
        order_details = await read_order_details_service.get_by_condition([{'order_id': order_id}], db)
        read_book_service = ReadService[Book](Book)
        update_book_service = UpdateService[Book, BookUpdate](Book)
        for order_detail in order_details:
            books = await read_book_service.get_by_condition([{'id': order_detail.book_id}], db)
            if not books:
                raise HTTPException(status_code=404, detail="Book not found")
            book = books[0]
            book_update = BookUpdate()
            book_update.amount_sell = book.amount_sell + order_detail.quantity
            await update_book_service.update({'id': order_detail.book_id}, book_update, db)
    return {'id': order_id, 'status': order_status}

@router.get("/Show all orders", summary="Show all orders")
async def Show_all_orders(db: AsyncSession = Depends(get_db)):
    read_order_service = ReadService[Order](Order)
    orders = await read_order_service.get_by_condition([{'id': ''}], db, 0)
    if not orders:
        raise HTTPException(status_code=404, detail="Orders not found")
    return orders

@router.get("/View_revenue", summary="View revenue")
async def View_revenue(db: AsyncSession = Depends(get_db)):
    read_order_service = ReadService[Order](Order)
    orders = await read_order_service.get_by_condition([{'status': 'Done'}], db)
    revenue = 0
    user_count = {}
    book_count = {}
    for order in orders:
        revenue += order.total_price
        user_count[order.user_id] = 1 if user_count.get(order.user_id) is None else user_count[order.user_id] + 1
            
        read_order_details_service = ReadService[OrderDetail](OrderDetail)
        order_details = await read_order_details_service.get_by_condition([{'order_id': order.id}], db)
        for order_detail in order_details:
            book_count[order_detail.book_id] = order_detail.quantity if book_count.get(order_detail.book_id) is None else book_count[order_detail.book_id] + order_detail.quantity
    return {'revenue': revenue, 'user_count': user_count, 'book_count': book_count}

@router.get("/Show Top best selling books", summary="Show Top best selling books")
async def Show_Top_best_selling_books(db: AsyncSession = Depends(get_db)):
    read_book_service = ReadService[Book](Book)
    books = await read_book_service.get_by_condition([{'id': ''}], db, 0)
    if not books:
        raise HTTPException(status_code=404, detail="Books not found")
    return await read_book_service.get_ordered(books, "amount_sell")

@router.get("/Show List Users", summary="Show list users")
async def show_list_users(db: AsyncSession = Depends(get_db)):
    read_user_service = ReadService[User](User)
    users = await read_user_service.get_by_condition([{'id': ''}], db, 0)
    if not users:
        raise HTTPException(status_code=404, detail="Users not found")
    user_list = []
    for user in users:
        user_list.append({'id': user.id, 'account_id': user.account_id})
    return user_list

# @router.put("/Ban Account", summary="Ban account")
# async def ban_account(account: AccountBanned, db: AsyncSession = Depends(get_db)):
#     update_account_service = UpdateService[Account, AccountBanned](Account)
#     return await update_account_service.update({'id': account.id}, account, db)