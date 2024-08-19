from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService, ReadService, CreateService, DeleteService, get_user_obj_by_token
from app.services.payment_service import createPaymentLink, getPaymentLinkInformation, cancelPaymentLink
from app.schemas.payment import PaymentCreate
from app.schemas.order import OrderCreate, OrderUpdate, OrderDetailCreate, OrderDetailUpdate
from app.models.order import Order
from app.models.order_detail import OrderDetail
from app.models.payment import Payment
from app.models.book import Book
from app.models.sale_off import SaleOff
from app.models.shipping import Shipping
from app.models.cart import Cart
from app.models.user import User
from app.models.account import Account
from app.database.database import get_db
import webbrowser
import uuid
from uuid import UUID
import time
from datetime import datetime, timedelta
from random import randint

router = APIRouter()
order_service = CRUDService[Order, OrderCreate, OrderUpdate](Order)
order_detail_service = CRUDService[Order, OrderDetailCreate, OrderDetailUpdate](OrderDetail)
read_user_service = ReadService[User](User)
read_book_service = ReadService[Book](Book)
read_cart_service = ReadService[Cart](Cart)
delete_cart_service = DeleteService[Cart](Cart)
create_payment_service = CreateService[Payment, PaymentCreate](Payment)


def check_payment_status_with_timeout(orderId: int, timeout_minutes: int = 1):
    return "PAID"
    start_time = datetime.now()
    timeout = timedelta(minutes=timeout_minutes)
    
    while True:
        payment_info = getPaymentLinkInformation(orderId)
        
        status = payment_info.status
        
        if status == "PAID":
            print(f"Order {orderId} has been paid.")
            return "PAID"
        
        if datetime.now() - start_time > timeout:
            print(f"Order {orderId} has timed out.")
            cancelPaymentLink(orderId)
            return "TIMEOUT"
        
        print(f"Order {orderId} status is {status}. Checking again in 10 seconds...")
        time.sleep(10) 

@router.post("/create_order",
            description="Create new order, payment method is COD or QR", 
            summary="Create new order, payment method is COD or QR")
async def create_order_endpoint(access_token: str, payment_method: str, address_id: str = None, shipping_id: str = None, db: AsyncSession = Depends(get_db)):
    user_obj = await get_user_obj_by_token(access_token, Account, User, db)
    user_id = user_obj.id
    cart_id = user_obj.cart_id
    order = OrderCreate()
    order.id = uuid.uuid4()
    order.user_id = user_id
    payment = PaymentCreate()
    payment.id = uuid.uuid4()

    order.address_id = address_id
    order.shipping_id = shipping_id
    
    read_shipping_service = ReadService[Shipping](Shipping)
    shipping = await read_shipping_service.get_by_condition([{'id':shipping_id}], db)
    if not shipping:
        raise HTTPException(status_code=404, detail="Shipping not found")
    shipping_cost = shipping[0].cost_unit
    
    cart = await read_cart_service.get_by_condition([{'id':cart_id}], db)
    if not cart:
        raise HTTPException(status_code=404, detail="cart not found")
    book_name_quantity_price = []
    total_price = 0
    for item in cart:
        book_id = item.book_id
        quantity = item.amount
        book = await read_book_service.get_by_condition([{"id": book_id}], db)
        if book is None:
            raise HTTPException(status_code=404, detail="Book not found")
        book_name = book[0].book_name
        price = book[0].price
        if book[0].sale_off:
            read_sale_off_service = ReadService[SaleOff](SaleOff)
            sale_off = await read_sale_off_service.get_by_condition([{"id": book[0].sale_off}], db)
            if sale_off:
                price = float(book[0].price) * (1 - sale_off[0].sale_off / 100)
            else:
                pass
        book_name_quantity_price.append((book_id, book_name, quantity, price))
        total_price += float(price) * float(quantity)
    
    payment.payment_method = payment_method
    payment.amount = 0
    ordercode = int(time.time()) * 100000 + randint(0, 100000)
    if payment_method == "QR":
        payment_link = createPaymentLink(ordercode, book_name_quantity_price, total_price, shipping_cost)
        webbrowser.open(payment_link.checkoutUrl)
        payment.payment_status = check_payment_status_with_timeout(ordercode)
        if payment.payment_status == "TIMEOUT":
            raise HTTPException(status_code=408, detail="Payment timeout")
    elif payment_method == "COD":
        payment.payment_status = "COD"
    else:
        raise HTTPException(status_code=400, detail="Payment method not supported")
    await create_payment_service.create(payment, db, 0)
    order.payment_id = payment.id
    order.total_price = float(total_price) + float(shipping_cost)
    await order_service.create(order, db, 0)
    await create_order_detail_from_cart(order.id, cart_id, db)
    return "Done"


@router.get("/show_order", summary="Show all order by User ID")
async def show_order_endpoint(access_token: str, db: AsyncSession = Depends(get_db)):
    user_obj = await get_user_obj_by_token(access_token, Account, User, db)
    user_id = user_obj.id
    order = await order_service.get_by_condition([{'user_id':user_id}], db)
    if not order:
        raise HTTPException(status_code=404, detail="order not found")
    return order

@router.delete("/delete_order", summary="Delete order by User ID")
async def delete_order_endpoint(order_id: UUID, db: AsyncSession = Depends(get_db)):
    return await order_service.delete({'id':order_id}, db)

async def create_order_detail(order_id: UUID, book_id: UUID, quantity: int, db: AsyncSession):
    order_detail = OrderDetailCreate()
    order_detail.order_id = order_id
    order_detail.book_id = book_id
    order_detail.quantity = quantity
    book = await read_book_service.get_by_condition([{"id": book_id}], db)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    order_detail.unit_price = book[0].price
    if book[0].sale_off:
        read_sale_off_service = ReadService[SaleOff](SaleOff)
        sale_off = await read_sale_off_service.get_by_condition([{"id": book[0].sale_off}], db)
        if sale_off:
            order_detail.unit_price = float(book[0].price) * (1 - sale_off[0].sale_off / 100)
    return await order_detail_service.create(order_detail, db, 0)

async def create_order_detail_from_cart(order_id: UUID, cart_id: str, db: AsyncSession):
    cart = await read_cart_service.get_by_condition([{'id':cart_id}], db)
    if not cart:
        raise HTTPException(status_code=404, detail="cart not found")
    for item in cart:
        book_id = item.book_id
        quantity = item.amount
        await create_order_detail(order_id, book_id, quantity, db)
        await delete_cart_service.delete({'id':cart_id, 'book_id':book_id}, db)

@router.get("/show_order_detail", summary="Show all order detail by Order ID")
async def show_order_detail_endpoint(order_id: UUID, db: AsyncSession = Depends(get_db)):
    order_detail = await order_detail_service.get_by_condition([{'order_id':order_id}], db)
    if not order_detail:
        raise HTTPException(status_code=404, detail="order detail not found")
    return order_detail

@router.delete("/delete_order_detail", summary="Delete order detail by Order ID")
async def delete_order_detail_endpoint(order_id: UUID, book_id: UUID, db: AsyncSession = Depends(get_db)):
    return await order_detail_service.delete({'order_id':order_id, 'book_id':book_id}, db)