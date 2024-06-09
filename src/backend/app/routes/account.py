from fastapi import APIRouter

from app.controllers import account_controller

router = APIRouter()

router.include_router(account_controller.router, prefix="/account", tags=["Account"])
