from fastapi import APIRouter

from app.controllers.AddressController import address_controller

router = APIRouter()


router.include_router(address_controller.router, prefix="/address", tags=["Address"])
