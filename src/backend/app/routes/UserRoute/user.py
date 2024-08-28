from fastapi import APIRouter

from app.controllers.UserController import user_controller

router = APIRouter()

router.include_router(user_controller.router, prefix="/user", tags=["User"])
