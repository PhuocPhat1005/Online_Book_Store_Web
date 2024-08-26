from fastapi import APIRouter

from app.controllers import review_controller

router = APIRouter() 

router.include_router(review_controller.router, prefix="/review", tags=["Review"])