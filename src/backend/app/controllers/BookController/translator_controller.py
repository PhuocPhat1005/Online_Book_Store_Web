from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.CRUDService.crud_service import CRUDService
from app.schemas.BookSchemas.translator import TranslatorCreate, TranslatorUpdate
from app.models.translator import Translator
from app.database.database import get_db
from uuid import UUID

router = APIRouter()
translator_service = CRUDService[Translator, TranslatorCreate, TranslatorUpdate](
    Translator
)


@router.post("/create_translator", summary="Create a new translator")
async def create_translator_endpoint(
    translator: TranslatorCreate, db: AsyncSession = Depends(get_db)
):
    return await translator_service.create(translator, db)

@router.get("/get_all_translators", summary="Get all translators")
async def get_all_translators_endpoint(db: AsyncSession = Depends(get_db)):
    return await translator_service.get_by_condition([{"id": ""}], db, 0)

@router.get("/get_translator/{translator_id}", summary="Get a translator by ID")
async def get_translator_endpoint(
    translator_id: UUID, db: AsyncSession = Depends(get_db)
):
    translator = await translator_service.get_by_condition([{"id": translator_id}], db)
    if not translator:
        raise HTTPException(status_code=404, detail="Translator not found")
    return translator


@router.get(
    "/get_translator_by_name/{translator_name}", summary="Get translators by name"
)
async def get_translators_by_name_endpoint(
    translator_name: str, db: AsyncSession = Depends(get_db)
):
    translators = await translator_service.get_by_condition(
        [{}, {"full_name": translator_name, "pen_name": translator_name}], db, 0
    )
    if not translators:
        raise HTTPException(
            status_code=404, detail="No translators found with that name"
        )
    return translators


@router.put("/update_translator/{translator_id}", summary="Update a translator by ID")
async def update_translator_endpoint(
    translator_id: UUID,
    translator_update: TranslatorUpdate,
    db: AsyncSession = Depends(get_db),
):
    translator = await translator_service.update(translator_id, translator_update, db)
    if not translator:
        raise HTTPException(status_code=404, detail="Translator not found")
    return translator


@router.delete(
    "/delete_translator/{translator_id}", summary="Delete a translator by ID"
)
async def delete_translator_endpoint(
    translator_id: UUID, db: AsyncSession = Depends(get_db)
):
    translator = await translator_service.delete(translator_id, db)
    if not translator:
        raise HTTPException(status_code=404, detail="Translator not found")
    return translator
