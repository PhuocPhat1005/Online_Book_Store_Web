from fastapi import APIRouter

from app.controllers.PaymentController import payment_controller

router = APIRouter()

router.include_router(payment_controller.router, prefix="/payment", tags=["Payment"])
