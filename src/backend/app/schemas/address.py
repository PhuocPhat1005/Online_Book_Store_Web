from pydantic import BaseModel
from uuid import UUID

class AddressBase(BaseModel):
    user_id: str | None = "empty_uuid"
    ward_id: str | None = "empty_uuid"
    address_detail: str | None = ""

class AddressCreate(AddressBase):
    pass

class AddressUpdate(BaseModel):
    ward_id: str | None = "empty_uuid"
    address_detail: str | None = ""

class ProvinceBase(BaseModel):
    id: str | None = "empty_uuid"
    province_name: str | None = ""
    country_id: str | None = "empty_uuid"
    
class ProvinceCreate(ProvinceBase):
    pass

class ProvinceUpdate(ProvinceBase):
    pass

class DistrictBase(BaseModel):
    id: str | None = "empty_uuid"
    district_name: str | None = ""
    province_id: str | None = "empty_uuid"
    
class DistrictCreate(DistrictBase):
    pass

class DistrictUpdate(DistrictBase):
    pass

class WardBase(BaseModel):
    ward_name: str | None = ""
    district_id: str | None = "empty_uuid"
    
class WardCreate(WardBase):
    pass

class WardUpdate(WardBase):
    pass

class CountryBase(BaseModel):
    id: str | None = "empty_uuid"
    country_name: str | None = ""
    
class CountryCreate(CountryBase):
    pass

class CountryUpdate(CountryBase):
    pass