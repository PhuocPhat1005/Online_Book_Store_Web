from fastapi import APIRouter

from app.controllers.OrderController import order_controller

router = APIRouter()

router.include_router(order_controller.router, prefix="/order", tags=["Order"])
