from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crud_service import CRUDService
from app.schemas.sale_off import SaleOffCreate, SaleOffUpdate
from app.models.sale_off import SaleOff
from app.database.database import get_db
from uuid import UUID
from datetime import datetime

router = APIRouter()
sale_off_service = CRUDService[SaleOff, SaleOffCreate, SaleOffUpdate](SaleOff)

@router.post("/create_sale_off", summary="Create a new sale off")
async def create_sale_off_endpoint(sale_off: SaleOffCreate, db: AsyncSession = Depends(get_db)):
    return await sale_off_service.create(sale_off, db)

@router.get("/show_all_sale_offs", summary="Show all sale offs")
async def show_all_sale_offs_endpoint(db: AsyncSession = Depends(get_db)):
    sale_offs = await sale_off_service.get_by_condition([{'id': ''}], db, 0)
    if not sale_offs:
        raise HTTPException(status_code=404, detail="Sale offs not found")
    for sale_off in sale_offs:
        if sale_off.time_end >= datetime.now():
            sale_off_service.delete({'id': sale_off.id}, db)
    return sale_offs

@router.put("/update_sale_off", summary="Update a sale off")
async def update_sale_off_endpoint(sale_off_id: UUID, sale_off: SaleOffUpdate, db: AsyncSession = Depends(get_db)):
    return await sale_off_service.update({'id': sale_off_id}, sale_off, db)

@router.delete("/delete_sale_off", summary="Delete a sale off")
async def delete_sale_off_endpoint(sale_off_id: UUID, db: AsyncSession = Depends(get_db)):
    return await sale_off_service.delete({'id': sale_off_id}, db)