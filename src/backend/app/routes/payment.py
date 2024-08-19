from fastapi import APIRouter

from app.controllers import payment_controller

router = APIRouter() 

router.include_router(payment_controller.router, prefix="/payment", tags=["Payment"])