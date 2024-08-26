from fastapi import APIRouter

from app.controllers import sale_off_controller

router = APIRouter() 

router.include_router(sale_off_controller.router, prefix="/sale_off", tags=["Sale_off"])