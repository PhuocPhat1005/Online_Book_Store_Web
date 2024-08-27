from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.CRUDService.crud_service import CRUDService
from app.models.voucher import Voucher
from app.schemas.VoucherSchemas.voucher import VoucherCreate, VoucherUpdate
from app.database.database import get_db
from uuid import UUID

router = APIRouter()
voucher_service = CRUDService[Voucher, VoucherCreate, VoucherUpdate](Voucher)


@router.post("/create_voucher", summary="Create a new voucher")
async def create_voucher_endpoint(
    voucher: VoucherCreate, db: AsyncSession = Depends(get_db)
):
    return await voucher_service.create(voucher, db)


@router.get("/show_all_vouchers", summary="Show all vouchers")
async def show_all_vouchers_endpoint(db: AsyncSession = Depends(get_db)):
    return await voucher_service.get_by_condition([{"id": ""}], db, 0)


@router.put("/update_voucher", summary="Update a voucher")
async def update_voucher_endpoint(
    voucher_id: str, voucher: VoucherUpdate, db: AsyncSession = Depends(get_db)
):
    return await voucher_service.update({"id": voucher_id}, voucher, db)


@router.delete("/delete_voucher", summary="Delete a voucher")
async def delete_voucher_endpoint(voucher_id: str, db: AsyncSession = Depends(get_db)):
    return await voucher_service.delete({"id": voucher_id}, db)
