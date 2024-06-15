from pydantic import BaseModel

class AuthorCreate(BaseModel): 
    full_name: str
    pen_name: str
    description: str