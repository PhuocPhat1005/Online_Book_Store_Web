from fastapi import APIRouter

from app.controllers.BookController import author_controller

router = APIRouter()

router.include_router(author_controller.router, prefix="/author", tags=["Author"])
