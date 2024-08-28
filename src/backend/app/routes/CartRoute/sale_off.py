from fastapi import APIRouter

from app.controllers.CartController import sale_off_controller

router = APIRouter()

router.include_router(sale_off_controller.router, prefix="/sale_off", tags=["Sale_off"])
