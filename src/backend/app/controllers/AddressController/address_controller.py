from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.CRUDService.crud_service import (
    CRUDService,
    get_user_obj_by_token,
    CreateService,
    ReadService,
    UpdateService,
)
from app.schemas.AddressSchemas.address import (
    AddressCreate,
    AddressUpdate,
    CountryCreate,
    ProvinceCreate,
    DistrictCreate,
    WardCreate,
    CountryUpdate,
    ProvinceUpdate,
    DistrictUpdate,
    WardUpdate,
)
from app.models.address import Address
from app.models.ward import Ward
from app.models.district import District
from app.models.province import Province
from app.models.country import Country
from app.models.user import User
from app.models.account import Account
from app.database.database import get_db
import uuid
import pandas as pd
from io import BytesIO

router = APIRouter()
address_service = CRUDService[Address, AddressCreate, AddressUpdate](Address)


@router.post("/create_country", summary="Create a new country")
async def create_country_endpoint(
    country: CountryCreate, db: AsyncSession = Depends(get_db)
):
    create_country_service = CreateService[Country, CountryCreate](Country)
    return await create_country_service.create(country, db)


@router.post("/create_province", summary="Create a new province")
async def create_province_endpoint(
    province: ProvinceCreate, db: AsyncSession = Depends(get_db)
):
    create_province_service = CreateService[Province, ProvinceCreate](Province)
    return await create_province_service.create(province, db)


@router.post("/create_district", summary="Create a new district")
async def create_district_endpoint(
    district: DistrictCreate, db: AsyncSession = Depends(get_db)
):
    create_district_service = CreateService[District, DistrictCreate](District)
    return await create_district_service.create(district, db)


@router.post("/create_ward", summary="Create a new ward")
async def create_ward_endpoint(ward: WardCreate, db: AsyncSession = Depends(get_db)):
    create_ward_service = CreateService[Ward, WardCreate](Ward)
    return await create_ward_service.create(ward, db)


@router.get("/show_all_countries", summary="Show all countries")
async def show_all_countries_endpoint(db: AsyncSession = Depends(get_db)):
    read_country_service = ReadService[Country](Country)
    countries = await read_country_service.get_by_condition([{"id": ""}], db, 0)
    if not countries:
        raise HTTPException(status_code=404, detail="Countries not found")
    return countries


@router.get("/show_all_provinces", summary="Show all provinces")
async def show_all_provinces_endpoint(
    country_id: str, db: AsyncSession = Depends(get_db)
):
    read_province_service = ReadService[Province](Province)
    provinces = await read_province_service.get_by_condition(
        [{"country_id": country_id}], db, 0
    )
    if not provinces:
        raise HTTPException(status_code=404, detail="Provinces not found")
    return provinces


@router.get("/show_all_districts", summary="Show all districts")
async def show_all_districts_endpoint(
    province_id: str, db: AsyncSession = Depends(get_db)
):
    read_district_service = ReadService[District](District)
    districts = await read_district_service.get_by_condition(
        [{"province_id": province_id}], db
    )
    if not districts:
        raise HTTPException(status_code=404, detail="Districts not found")
    return districts


@router.get("/show_all_wards", summary="Show all wards")
async def show_all_wards_endpoint(district_id: str, db: AsyncSession = Depends(get_db)):
    read_ward_service = ReadService[Ward](Ward)
    wards = await read_ward_service.get_by_condition([{"district_id": district_id}], db)
    if not wards:
        raise HTTPException(status_code=404, detail="Wards not found")
    return wards


@router.post("/create_address", summary="Create a new address")
async def create_address_endpoint(
    access_token: str,
    address_detail: str,
    ward_id: str,
    db: AsyncSession = Depends(get_db),
):
    user_obj = await get_user_obj_by_token(access_token, db)
    if not user_obj:
        raise HTTPException(status_code=404, detail="User not found")
    address = AddressCreate()
    address.user_id = user_obj.id
    address.address_detail = address_detail
    address.ward_id = ward_id
    return await address_service.create(address, db)

async def get_address_by_user_id(user_id, db: AsyncSession):
    address = await address_service.get_by_condition([{"user_id": user_id}], db)
    if not address:
        return []
    read_ward_service = ReadService[Ward](Ward)
    read_district_service = ReadService[District](District)
    read_province_service = ReadService[Province](Province)
    read_country_service = ReadService[Country](Country)
    address_arr = []
    for a in address:
        ward = await read_ward_service.get_by_condition([{"id": a.ward_id}], db)
        district = await read_district_service.get_by_condition(
            [{"id": ward[0].district_id}], db
        )
        province = await read_province_service.get_by_condition(
            [{"id": district[0].province_id}], db
        )
        country = await read_country_service.get_by_condition(
            [{"id": province[0].country_id}], db
        )
        address_arr.append(
            {
                "address_id": a.id,
                "address": a.address_detail,
                "ward": ward[0].ward_name,
                "district": district[0].district_name,
                "province": province[0].province_name,
                "country": country[0].country_name,
            }
        )

    return address_arr

@router.get("/get_user_address", summary="Get a address by access token")
async def get_address_endpoint(access_token: str, db: AsyncSession = Depends(get_db)):
    user_obj = await get_user_obj_by_token(access_token, db)
    user_id = user_obj.id
    if not user_obj:
        raise HTTPException(status_code=404, detail="User not found")
    return await get_address_by_user_id(user_id, db)


@router.put("/update_address", summary="Update a address by ID")
async def update_address_endpoint(
    address_id: str, address_update: AddressUpdate, db: AsyncSession = Depends(get_db)
):
    read_address = await address_service.get_by_condition([{"id": address_id}], db)
    if not read_address:
        raise HTTPException(status_code=404, detail="Address not found")
    address = await address_service.update({"id": address_id}, address_update, db)
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    return address


@router.delete("/delete_address", summary="Delete a address by ID")
async def delete_address_endpoint(address_id: str, db: AsyncSession = Depends(get_db)):
    address = await address_service.delete({"id": address_id}, db)
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    return address


@router.post("/Init_address", summary="Init address")
async def init_address_endpoint(
    file: UploadFile = File(...), db: AsyncSession = Depends(get_db)
):
    create_country_service = CreateService[Country, CountryCreate](Country)
    create_province_service = CreateService[Province, ProvinceCreate](Province)
    create_district_service = CreateService[District, DistrictCreate](District)
    create_ward_service = CreateService[Ward, WardCreate](Ward)
    # Check if the file type is supported
    if file.content_type not in [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ]:
        raise HTTPException(
            status_code=400, detail="Invalid file format. Please upload an Excel file."
        )

    # Read the Excel file content
    contents = await file.read()
    excel_data = pd.read_excel(BytesIO(contents))

    # Expected columns in the Excel file
    required_columns = ["Province", "District", "Ward"]

    # Check if the required columns are present
    if not all(column in excel_data.columns for column in required_columns):
        raise HTTPException(
            status_code=400, detail="Excel file is missing required columns."
        )

    # Iterate over the rows in the DataFrame and add each author to the database
    country_id = uuid.uuid4()
    country = CountryCreate(id=str(country_id), country_name="Vietnam")
    await create_country_service.create(country, db, 0)
    prev_province = "-1"
    prev_district = "-1"
    province_id = ""
    district_id = ""
    for _, row in excel_data.iterrows():
        if prev_province != str(row["Province"]):
            province_id = uuid.uuid4()
            province = ProvinceCreate(
                id=str(province_id),
                province_name=str(row["Province"]),
                country_id=str(country_id),
            )
            await create_province_service.create(province, db, 0)
            prev_province = str(row["Province"])
        if prev_district != str(row["District"]):
            district_id = uuid.uuid4()
            district = DistrictCreate(
                id=str(district_id),
                district_name=str(row["District"]),
                province_id=str(province_id),
            )
            await create_district_service.create(district, db, 0)
            prev_district = str(row["District"])
        ward = WardCreate(ward_name=str(row["Ward"]), district_id=str(district_id))
        await create_ward_service.create(ward, db)

    return {"message": "Address successfully added to the database"}
