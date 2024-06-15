from fastapi import APIRouter

from app.controllers import author_controller

router = APIRouter() 

router.include_router(author_controller.router, prefix="/author", tags=["Author"])