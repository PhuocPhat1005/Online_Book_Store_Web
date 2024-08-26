from fastapi import APIRouter

from app.controllers import voucher_controller

router = APIRouter()


router.include_router(voucher_controller.router, prefix="/voucher", tags=["Voucher"])
