from pydantic import BaseModel
from uuid import UUID

class AddressBase(BaseModel):
    user_id: UUID | None = ""
    ward_id: UUID | None = ""
    address_detail: str | None = None

class AddressCreate(AddressBase):
    pass

class AddressUpdate(BaseModel):
    ward_id: UUID | None = ""
    address_detail: str | None = None

class ProvinceBase(BaseModel):
    province_name: str | None = None
    country_id: UUID | None = ""
    
class ProvinceCreate(ProvinceBase):
    pass

class ProvinceUpdate(ProvinceBase):
    pass

class DistrictBase(BaseModel):
    district_name: str | None = None
    province_id: UUID | None = ""
    
class DistrictCreate(DistrictBase):
    pass

class DistrictUpdate(DistrictBase):
    pass

class WardBase(BaseModel):
    ward_name: str | None = None
    district_id: UUID | None = ""
    
class WardCreate(WardBase):
    pass

class WardUpdate(WardBase):
    pass

class CountryBase(BaseModel):
    country_name: str | None = None
    
class CountryCreate(CountryBase):
    pass

class CountryUpdate(CountryBase):
    pass