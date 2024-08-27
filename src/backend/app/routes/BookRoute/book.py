from fastapi import APIRouter

from app.controllers.BookController import book_controller

router = APIRouter()


router.include_router(book_controller.router, prefix="/book", tags=["Book"])
