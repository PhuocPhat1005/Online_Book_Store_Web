from fastapi import APIRouter

from app.controllers import book_controller

router = APIRouter()


router.include_router(book_controller.router, prefix="/book", tags=["Book"])
