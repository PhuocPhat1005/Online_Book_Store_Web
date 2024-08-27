from fastapi import APIRouter

from app.controllers.VoucherController import voucher_controller

router = APIRouter()


router.include_router(voucher_controller.router, prefix="/voucher", tags=["Voucher"])
