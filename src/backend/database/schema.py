# from sqlmodel import SQLModel, Session

# from .models import * # Adjusted for correct import
# from backend.database.engine import engine

# SQLModel.metadata.create_all(engine)

# session = Session(engine)


from sqlalchemy.orm import Session
from .db_conn import engine
from .models import *  # Điều chỉnh để import đúng các models
from .engine import Base

# Tạo các bảng trong cơ sở dữ liệu
def create_tables():
    Base.metadata.create_all(engine)

# Tạo một session
session = Session(engine)



