from fastapi import APIRouter

from app.controllers.AccountController import account_controller

router = APIRouter()

router.include_router(account_controller.router, prefix="/account", tags=["Account"])
