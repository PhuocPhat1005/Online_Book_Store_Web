from fastapi import APIRouter

from app.controllers.AccountController import auth_controller

router = APIRouter()


router.include_router(auth_controller.router, prefix="/auth", tags=["Authentication"])
