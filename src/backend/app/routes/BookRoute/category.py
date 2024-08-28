from fastapi import APIRouter

from app.controllers.BookController import category_controller

router = APIRouter()

router.include_router(category_controller.router, prefix="/category", tags=["Category"])
