from fastapi import APIRouter

from app.controllers.CartController import cart_controller

router = APIRouter()

router.include_router(cart_controller.router, prefix="/cart", tags=["Cart"])
