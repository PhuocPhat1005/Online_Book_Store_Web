from fastapi import APIRouter

from app.controllers.BookController import translator_controller

router = APIRouter()


router.include_router(
    translator_controller.router, prefix="/translator", tags=["Translator"]
)
