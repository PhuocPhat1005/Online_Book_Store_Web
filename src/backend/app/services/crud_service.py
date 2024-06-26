from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from uuid import UUID
from fastapi import HTTPException
from typing import Type, TypeVar, Generic
from sqlalchemy.orm import Session
from pydantic import BaseModel
from sqlalchemy import Column

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class CRUDService(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def create(self, obj_in: CreateSchemaType, db: AsyncSession) -> ModelType:
        obj_in_data = obj_in.dict()
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        try:
            await db.flush()
            await db.commit()
        except Exception as e:
            await db.rollback()
            raise RuntimeError(f"Failed to create {self.model.__name__}: {e}") from e
        return db_obj

    async def get(self, obj_id: UUID, db: AsyncSession) -> ModelType:
        result = await db.execute(select(self.model).where(self.model.id == obj_id))
        db_obj = result.scalars().first()
        if not db_obj:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
        return db_obj
    
    async def get_by_name(self, obj_name: str, name_fields: list[Column], db: AsyncSession) -> list[ModelType]:
            conditions = [field == obj_name for field in name_fields]
            query = select(self.model).where(or_(*conditions)).distinct()
            result = await db.execute(query)
            db_objs = result.scalars().all()
            if not db_objs:
                raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
            return db_objs

    async def update(self, obj_id: UUID, obj_in: UpdateSchemaType, db: AsyncSession) -> ModelType:
        result = await db.execute(select(self.model).where(self.model.id == obj_id))
        db_obj = result.scalars().first()
        if not db_obj:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")

        obj_data = obj_in.dict()
        for field, value in obj_data.items():
            setattr(db_obj, field, value)

        try:
            await db.flush()
            await db.commit()
        except Exception as e:
            await db.rollback()
            raise RuntimeError(f"Failed to update {self.model.__name__}: {e}") from e

        return db_obj

    async def delete(self, obj_id: UUID, db: AsyncSession) -> ModelType:
        result = await db.execute(select(self.model).where(self.model.id == obj_id))
        db_obj = result.scalars().first()
        if not db_obj:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")

        try:
            await db.delete(db_obj)
            await db.commit()
        except Exception as e:
            await db.rollback()
            raise RuntimeError(f"Failed to delete {self.model.__name__}: {e}") from e

        return {"message": f"{self.model.__name__} deleted successfully"}
