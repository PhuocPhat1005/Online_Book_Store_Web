import signal
import asyncio
import uvicorn
from fastapi import FastAPI
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.routes import auth, account, author, book, category, publishing_company
from app.database.database import Base
from app.config.config import settings

from fastapi.middleware.cors import CORSMiddleware

# Khởi tạo AsyncEngine
engine = create_async_engine(settings.DATABASE_URL, echo=True)

# Khởi tạo session factory
SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, class_=AsyncSession
)

# Khởi tạo ứng dụng FastAPI
app = FastAPI(
    title="SIBOOKS Web API",
    description="API documents for the online bookstore SIBOOKS project",
    version="1.0.0",
)

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Khởi tạo các bảng trong cơ sở dữ liệu
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# Kết nối các router
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)
app.include_router(auth.router)
app.include_router(account.router)
app.include_router(author.router)
app.include_router(book.router)
app.include_router(category.router)
app.include_router(publishing_company.router)


def main():
    config = uvicorn.Config(
        "app.main:app", host="0.0.0.0", port=8000, log_level="info", reload=True
    )
    server = uvicorn.Server(config)

    loop = asyncio.get_event_loop()

    def handle_shutdown(loop, sig):
        print(f"Received exit signal {sig.name}...")
        tasks = [t for t in asyncio.all_tasks() if t is not asyncio.current_task()]

        for task in tasks:
            task.cancel()

        loop.stop()

    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, handle_shutdown, loop, sig)

    try:
        loop.run_until_complete(server.serve())
    except asyncio.CancelledError:
        pass
    finally:
        loop.close()


if __name__ == "__main__":
    main()
