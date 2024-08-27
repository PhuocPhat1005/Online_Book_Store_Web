from fastapi import APIRouter

from app.controllers.CartController import shipping_controller

router = APIRouter()

router.include_router(shipping_controller.router, prefix="/shipping", tags=["Shipping"])
