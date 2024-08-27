from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.CRUDService.crud_service import CRUDService
from app.schemas.CartSchemas.shipping import ShippingCreate, ShippingUpdate
from app.models.shipping import Shipping
from app.database.database import get_db
from uuid import UUID

router = APIRouter()
shipping_service = CRUDService[Shipping, ShippingCreate, ShippingUpdate](Shipping)


@router.post("/create_shipping", summary="Create a new shipping")
async def create_shipping_endpoint(
    shipping: ShippingCreate, db: AsyncSession = Depends(get_db)
):
    return await shipping_service.create(shipping, db)


@router.get("/show_all_shippings", summary="Show all shippings")
async def show_all_shippings_endpoint(db: AsyncSession = Depends(get_db)):
    shippings = await shipping_service.get_by_condition([{"id": ""}], db, 0)
    if not shippings:
        raise HTTPException(status_code=404, detail="Shippings not found")
    return shippings


@router.put("/update_shipping", summary="Update a shipping")
async def update_shipping_endpoint(
    shipping_id: UUID, shipping: ShippingUpdate, db: AsyncSession = Depends(get_db)
):
    return await shipping_service.update({"id": shipping_id}, shipping, db)


@router.delete("/delete_shipping", summary="Delete a shipping")
async def delete_shipping_endpoint(
    shipping_id: UUID, db: AsyncSession = Depends(get_db)
):
    return await shipping_service.delete({"id": shipping_id}, db)
