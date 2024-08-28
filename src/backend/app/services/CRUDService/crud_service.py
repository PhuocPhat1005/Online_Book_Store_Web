from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, cast, String
from uuid import UUID
from fastapi import HTTPException
from typing import Type, TypeVar, Generic, Dict
from pydantic import BaseModel
import uuid
import sys
from urllib.parse import parse_qs
from app.utils.security import decode_token
from app.models.account import Account
from app.models.user import User
from sqlalchemy import desc as desc_func, asc as asc_func

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CreateService(Generic[ModelType, CreateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def create(
        self, obj_in: CreateSchemaType, db: AsyncSession, flag: int = 1
    ) -> ModelType:
        obj_in_data = obj_in.dict()
        for field, value in obj_in_data.items():
            if value == "empty_uuid":
                obj_in_data[field] = None

        db_obj = self.model(**obj_in_data)
        if flag:
            db_obj.id = uuid.uuid4()
        id_ = db_obj.id
        db.add(db_obj)
        try:
            await db.flush()
            await db.commit()
        except Exception as e:
            await db.rollback()
            raise RuntimeError(f"Failed to create {self.model.__name__}: {e}") from e
        return f"Created obj in {self.model.__name__} with ID {id_}"


class ReadService(Generic[ModelType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get_by_condition(
        self,
        list_search_params: list[Dict[str, any]],
        db: AsyncSession,
        equal_condition: int = 1,
        offset: int = 0,
        limit: int = sys.maxsize,
        order_by: str = "id",
        desc: int = 1,
    ) -> list[ModelType]:
        conditions = []

        for i, search_params in enumerate(list_search_params):
            sub_conditions = []
            if not search_params:
                continue
            for field_name, search_value in search_params.items():
                if field_name == "price_from":
                    field = getattr(self.model, "price", None)
                    if field is None:
                        raise HTTPException(
                            status_code=400,
                            detail=f"Field price does not exist on {self.model.__name__}",
                        )
                    condition = field >= float(search_value[0])
                    sub_conditions.append(condition)
                    continue
                if field_name == "price_to":
                    field = getattr(self.model, "price", None)
                    if field is None:
                        raise HTTPException(
                            status_code=400,
                            detail=f"Field price does not exist on {self.model.__name__}",
                        )
                    condition = field <= float(search_value[0])
                    sub_conditions.append(condition)
                    continue

                if field_name == "rate":
                    field = getattr(self.model, "rate", None)
                    if field is None:
                        raise HTTPException(
                            status_code=400,
                            detail=f"Field rate does not exist on {self.model.__name__}",
                        )
                    condition = field >= float(search_value[0])
                    sub_conditions.append(condition)
                    continue

                field = getattr(self.model, field_name, None)
                if field is None:
                    raise HTTPException(
                        status_code=400,
                        detail=f"Field {field_name} does not exist on {self.model.__name__}",
                    )
                if isinstance(search_value, list):
                    for value in search_value:
                        if equal_condition:
                            condition = field == value
                        else:
                            condition = cast(field, String).ilike(f"%{value}%")

                        sub_conditions.append(condition)
                else:
                    if equal_condition:
                        condition = field == search_value
                    else:
                        condition = cast(field, String).ilike(f"%{search_value}%")
                    sub_conditions.append(condition)

            if i == 0:
                conditions.append(and_(*sub_conditions))
            else:
                conditions.append(or_(*sub_conditions))

        if not conditions:
            raise HTTPException(
                status_code=400, detail="At least one search parameter must be provided"
            )

        # Combine all conditions using AND
        final_condition = and_(*conditions) if len(conditions) > 1 else conditions[0]

        if not conditions:
            raise HTTPException(
                status_code=400, detail="At least one search parameter must be provided"
            )

        order_by_clause = (
            desc_func(getattr(self.model, order_by))
            if desc
            else asc_func(getattr(self.model, order_by))
        )

        query = (
            select(self.model)
            .where(final_condition)
            .order_by(order_by_clause)
            .distinct()
        )
        query = query.limit(limit)
        query = query.offset(offset)
        result = await db.execute(query)
        db_objs = result.scalars().all()

        if not db_objs:
            return []

        return db_objs

    async def get_ordered(
        self, list_item: list[ModelType], order_by: str = "id", desc_order: bool = True
    ) -> list[ModelType]:
        if not list_item:
            raise HTTPException(status_code=404, detail="No items provided")

        if order_by:
            try:
                list_item.sort(key=lambda x: getattr(x, order_by), reverse=desc_order)
            except AttributeError:
                raise HTTPException(
                    status_code=400,
                    detail=f"Field {order_by} does not exist on {self.model.__name__}",
                )

        if not list_item:
            raise HTTPException(
                status_code=404,
                detail=f"No records found in the specified range for {self.model.__name__}",
            )

        return list_item


class UpdateService(Generic[ModelType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def update(
        self, condition_list: Dict[str, any], obj_in: UpdateSchemaType, db: AsyncSession
    ) -> ModelType:
        conditions = []
        for field_name, search_value in condition_list.items():
            field = getattr(self.model, field_name, None)
            if field is None:
                raise HTTPException(
                    status_code=400,
                    detail=f"Field {field_name} does not exist on {self.model.__name__}",
                )
            if isinstance(search_value, list):
                condition = field.in_(search_value)
            else:
                condition = field == search_value
            conditions.append(condition)

        result = await db.execute(select(self.model).where(and_(*conditions)))
        db_objs = result.scalars().all()
        for obj in db_objs:
            for field_name, value in obj_in.dict().items():
                if (
                    value == ""
                    or value is None
                    or value == []
                    or value == {}
                    or value == "string"
                    or value == -1
                    or value == "empty_uuid"
                ):
                    continue
                setattr(obj, field_name, value)
            try:
                await db.commit()
            except Exception as e:
                await db.rollback()
                raise RuntimeError(
                    f"Failed to update {self.model.__name__}: {e}"
                ) from e
        return f"Updated obj in {self.model.__name__} successfully"


class DeleteService(Generic[ModelType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def delete(
        self, condition_list: Dict[str, any], db: AsyncSession
    ) -> ModelType:
        conditions = []
        for field_name, search_value in condition_list.items():
            field = getattr(self.model, field_name, None)
            if field is None:
                raise HTTPException(
                    status_code=400,
                    detail=f"Field {field_name} does not exist on {self.model.__name__}",
                )
            if isinstance(search_value, list):
                condition = field.in_(search_value)
            else:
                condition = field == search_value
            conditions.append(condition)

        result = await db.execute(select(self.model).where(and_(*conditions)))
        db_objs = result.scalars().all()

        if not db_objs:
            raise HTTPException(
                status_code=404, detail=f"{self.model.__name__} not found"
            )
        for obj in db_objs:
            try:
                await db.delete(obj)
                await db.commit()
            except Exception as e:
                await db.rollback()
                raise RuntimeError(
                    f"Failed to delete {self.model.__name__}: {e}"
                ) from e
        return f"Deleted obj in {self.model.__name__} successfully"


class CRUDService(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model
        self.create_service = CreateService(model)
        self.read_service = ReadService(model)
        self.update_service = UpdateService(model)
        self.delete_service = DeleteService(model)

    async def create(
        self, obj_in: CreateSchemaType, db: AsyncSession, flag: int = 1
    ) -> ModelType:
        return await self.create_service.create(obj_in, db, flag)

    async def get_by_condition(
        self,
        list_search_params: list[Dict[str, any]],
        db: AsyncSession,
        equal_condition: int = 1,
        offset: int = 0,
        limit: int = sys.maxsize,
        order_by: str = "id",
        desc: int = 1,
    ) -> list[ModelType]:
        return await self.read_service.get_by_condition(
            list_search_params, db, equal_condition, offset, limit, order_by, desc
        )

    async def get_ordered(
        self, list_item: list[ModelType], order_by: str = "id", desc_order: bool = True
    ) -> list[ModelType]:
        return await self.read_service.get_ordered(list_item, order_by, desc_order)

    async def update(
        self, conditions: Dict[str, any], obj_in: UpdateSchemaType, db: AsyncSession
    ) -> ModelType:
        return await self.update_service.update(conditions, obj_in, db)

    async def delete(self, conditions: Dict[str, any], db: AsyncSession) -> ModelType:
        return await self.delete_service.delete(conditions, db)


def query_string_to_dict(query_string: str) -> dict:
    parsed_dict = parse_qs(query_string)

    def convert_value(values):
        converted_values = []
        for value in values:
            try:
                float_value = float(value)
                if float_value.is_integer():
                    converted_values.append(int(float_value))
                else:
                    converted_values.append(float_value)
            except ValueError:
                converted_values.append(value)
        return converted_values

    return {k: convert_value(v) for k, v in parsed_dict.items()}


async def query_in_db_by_id(
    db: AsyncSession, model: Type[ModelType], id_: str
) -> list[ModelType]:
    query = select(model).where(model.id == id_)
    result = await db.execute(query)
    db_objs = result.scalars().all()
    return db_objs


async def get_user_obj_by_token(token: str, db: AsyncSession):
    user_name = decode_token(token)
    read_account_service = ReadService[Account](Account)
    account = await read_account_service.get_by_condition([{"username": user_name}], db)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    account_id = account[0].id
    read_user_service = ReadService[User](User)
    user = await read_user_service.get_by_condition([{"account_id": account_id}], db)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user[0]
