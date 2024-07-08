from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, Column, cast, Integer, Float, Boolean, DateTime, Numeric, String
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

    # async def get(self, obj_id: UUID, db: AsyncSession) -> ModelType:
    #     result = await db.execute(select(self.model).where(self.model.id == obj_id))
    #     db_obj = result.scalars().first()
    #     if not db_obj:
    #         raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
    #     return db_obj
    
    # async def get_by_one_value(self, obj_name: str, name_fields: list[Column], db: AsyncSession, exactly: int = 1, offset: int = 0, limit: int = sys.maxsize) -> list[ModelType]:
    #     if exactly:
    #         conditions = [field == obj_name for field in name_fields]
    #     else:
    #         conditions = [field.like(f"%{obj_name}%") for field in name_fields]
            
    #     query = select(self.model).where(or_(*conditions)).distinct()
    #     query = query.limit(limit)
    #     query = query.offset(offset)
    #     result = await db.execute(query)
    #     db_objs = result.scalars().all()
    #     if not db_objs:
    #         raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
    #     return db_objs

    # async def get_by_condition(self, search_params: Dict[str, any], db: AsyncSession, euqal_condition: int = 1, and_condition: int = 1, offset: int = 0, limit: int = sys.maxsize) -> list[ModelType]:
    #     conditions = []
        
    #     for field_name, search_value in search_params.items():
    #         field = getattr(self.model, field_name, None)
    #         if field is None:
    #             raise HTTPException(status_code=400, detail=f"Field {field_name} does not exist on {self.model.__name__}")
    #         for value in search_value:
    #             if euqal_condition:
    #                 conditions.append(field == value)
    #             else:
    #                 conditions.append(cast(field, String).ilike(f"%{value}%"))

            
    #     if not conditions:
    #         raise HTTPException(status_code=400, detail="At least one search parameter must be provided")

    #     if and_condition:
    #         query = select(self.model).where(and_(*conditions)).distinct()
    #     else:
    #         query = select(self.model).where(or_(*conditions)).distinct()
    #     query = query.limit(limit)
    #     query = query.offset(offset)
    #     result = await db.execute(query)
    #     db_objs = result.scalars().all()

    #     if not db_objs:
    #         raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")

    #     return db_objs
    
    async def get_by_condition(self, list_search_params: list[Dict[str, any]], db: AsyncSession, equal_condition: int = 1, offset: int = 0, limit: int = sys.maxsize) -> list[ModelType]:
        conditions = []
        
        for i, search_params in enumerate(list_search_params):
            sub_conditions = []
            if not search_params:
                continue
            for field_name, search_value in search_params.items():
                field = getattr(self.model, field_name, None)
                if field is None:
                    raise HTTPException(status_code=400, detail=f"Field {field_name} does not exist on {self.model.__name__}")
                if isinstance(search_value, list):
                    for value in search_value:
                        if equal_condition:
                            condition = (field == value)
                        else:
                            condition = cast(field, String).ilike(f"%{value}%")

                        sub_conditions.append(condition)
                else:
                    if equal_condition:
                        condition = (field == search_value)
                    else:
                        condition = cast(field, String).ilike(f"%{search_value}%")
                    sub_conditions.append(condition)

            if i == 0:
                conditions.append(and_(*sub_conditions))
            else:
                conditions.append(or_(*sub_conditions))

        if not conditions:
            raise HTTPException(status_code=400, detail="At least one search parameter must be provided")

        # Combine all conditions using AND
        final_condition = and_(*conditions) if len(conditions) > 1 else conditions[0]
        
                        
        if not conditions:
            raise HTTPException(status_code=400, detail="At least one search parameter must be provided")

        query = select(self.model).where(final_condition).distinct()
        query = query.limit(limit)
        query = query.offset(offset)
        result = await db.execute(query)
        db_objs = result.scalars().all()

        if not db_objs:
            raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")

        return db_objs

    async def get_ordered(self, list_item: list[ModelType], order_by: str = "id", desc_order: bool = True) -> list[ModelType]:
        if not list_item:
            raise HTTPException(status_code=404, detail="No items provided")

        if order_by:
            try:
                list_item.sort(key=lambda x: getattr(x, order_by), reverse=desc_order)
            except AttributeError:
                raise HTTPException(status_code=400, detail=f"Field {order_by} does not exist on {self.model.__name__}")

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
    
    def convert_value(values):
        converted_values = []
        for value in values:
            if value.isdigit():
                converted_values.append(int(value))
            else:
                try:
                    converted_values.append(float(value))
                except ValueError:
                    converted_values.append(value)
        return converted_values

    return {k: convert_value(v) for k, v in parsed_dict.items()}