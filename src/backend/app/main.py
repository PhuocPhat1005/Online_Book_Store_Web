from fastapi import FastAPI
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.routes import auth, account
from app.database.database import Base
from app.config.config import settings

# Khởi tạo AsyncEngine
engine = create_async_engine(settings.DATABASE_URL, echo=True)

# Khởi tạo session factory
SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, class_=AsyncSession
)

# Khởi tạo ứng dụng FastAPI
app = FastAPI()


# Khởi tạo các bảng trong cơ sở dữ liệu
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# Kết nối các router
app.include_router(auth.router)
app.include_router(account.router)
