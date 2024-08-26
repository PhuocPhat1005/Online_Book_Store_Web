from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config.config import settings

# Khởi tạo AsyncEngine
engine = create_async_engine(settings.DATABASE_URL, echo=False)

# Khởi tạo session factory
SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, class_=AsyncSession
)

# Khởi tạo Base cho các model
Base = declarative_base()


# Hàm get_db để sử dụng session trong các route
async def get_db() -> AsyncSession:
    async with SessionLocal() as session:
        yield session
