from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, Column, cast, Integer, Float, Boolean, DateTime, Numeric
from uuid import UUID
from fastapi import HTTPException
from typing import Type, TypeVar, Generic, Dict, Callable
from sqlalchemy.orm import Session
from pydantic import BaseModel
import uuid
from sqlalchemy import asc, desc
import sys
from urllib.parse import parse_qs
from datetime import datetime
from sqlalchemy import extract

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class CRUDService(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model
    
    async def create(self, obj_in: CreateSchemaType, db: AsyncSession) -> ModelType:
        obj_in_data = obj_in.dict()
        db_obj = self.model(**obj_in_data)
        db_obj.id = uuid.uuid4()
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
    
    async def get_by_one_value(self, obj_name: str, name_fields: list[Column], db: AsyncSession, exactly: int = 1, offset: int = 0, limit: int = sys.maxsize) -> list[ModelType]:
        if exactly:
            conditions = [field == obj_name for field in name_fields]
        else:
            conditions = [field.like(f"%{obj_name}%") for field in name_fields]
            
        query = select(self.model).where(or_(*conditions)).distinct()
        query = query.limit(limit)
        query = query.offset(offset)
        result = await db.execute(query)
        db_objs = result.scalars().all()
        if not db_objs:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
        return db_objs

    async def get_by_many_value(self, search_params: Dict[str, any], db: AsyncSession, condition: int = 1, offset: int = 0, limit: int = sys.maxsize) -> list[ModelType]:
        conditions = []
        
        for field_name, search_value in search_params.items():
            # if field_name == 'price_lower':
            #     field = getattr(self.model, 'price', None)
            #     if field is None:
            #         raise HTTPException(status_code=400, detail=f"Field price does not exist on {self.model.__name__}")
            #     else:
            #         conditions.append(field >= search_value)
            #     continue
            # if field_name == 'price_upper':
            #     field = getattr(self.model, 'price', None)
            #     if field is None:
            #         raise HTTPException(status_code=400, detail=f"Field price does not exist on {self.model.__name__}")
            #     else:
            #         conditions.append(field <= search_value)
            #     continue
            # if field_name == 'publishing_year':
            #     field = getattr(self.model, 'publishing_date', None)
            #     if field is None:
            #         raise HTTPException(status_code=400, detail=f"Field created_at does not exist on {self.model.__name__}")
            #     else:
            #         conditions.append(extract('year', field) == search_value)
            #     continue
            field = getattr(self.model, field_name, None)
            if field is None:
                raise HTTPException(status_code=400, detail=f"Field {field_name} does not exist on {self.model.__name__}")
            if condition:
                conditions.append(field == search_value)
            else:
                conditions.append(field.ilike(f"%{search_value}%"))
            
        if not conditions:
            raise HTTPException(status_code=400, detail="At least one search parameter must be provided")

        query = select(self.model).where(and_(*conditions)).distinct()
        query = query.limit(limit)
        query = query.offset(offset)
        result = await db.execute(query)
        db_objs = result.scalars().all()

        if not db_objs:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")

        return db_objs

    async def get_ordered(self, list_item: list[ModelType], order_by: str = "id", desc_order: bool = True, from_: int = 0, amount_: int = sys.maxsize) -> list[ModelType]:
        if not list_item:
            raise HTTPException(status_code=404, detail="No items provided")

        if order_by:
            try:
                list_item.sort(key=lambda x: getattr(x, order_by), reverse=desc_order)
            except AttributeError:
                raise HTTPException(status_code=400, detail=f"Field {order_by} does not exist on {self.model.__name__}")

        if amount_ > 0:
            list_item = list_item[from_:from_ + amount_]
        else:
            list_item = list_item[from_:]

        if not list_item:
            raise HTTPException(status_code=404, detail=f"No records found in the specified range for {self.model.__name__}")

        return list_item

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

def query_string_to_dict(query_string: str) -> dict:
    parsed_dict = parse_qs(query_string)
    
    def convert_value(value):
        if value.isdigit():
            return int(value)
        try:
            return float(value)
        except ValueError:
            return value

    return {k: convert_value(v[0]) for k, v in parsed_dict.items()}