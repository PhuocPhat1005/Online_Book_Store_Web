from fastapi import APIRouter

from app.controllers import publishing_company_controller

router = APIRouter()


router.include_router(publishing_company_controller.router, prefix="/publishing_company", tags=["Publishing_Company"])
