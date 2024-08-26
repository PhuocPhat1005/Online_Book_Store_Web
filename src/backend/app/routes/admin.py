from fastapi import APIRouter

from app.controllers import admin_controller

router = APIRouter()


router.include_router(admin_controller.router, prefix="/admin", tags=["Admin"])
