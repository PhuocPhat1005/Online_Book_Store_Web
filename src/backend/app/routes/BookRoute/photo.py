from fastapi import APIRouter

from app.controllers.BookController import photo_controller

router = APIRouter()

router.include_router(photo_controller.router, prefix="/photo", tags=["Photo"])
