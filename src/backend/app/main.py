import signal
import asyncio
import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from app.routes.VoucherController import voucher
from app.database.database import Base
from app.config.config import settings
from app.routes.AccountRoute import account, admin, auth
from app.routes.AddressRoute import address
from app.routes.BookRoute import (
    author,
    book,
    category,
    photo,
    publishing_company,
    translator,
)
from app.routes.CartRoute import cart, sale_off, shipping
from app.routes.CommentRoute import review
from app.routes.OrderRoute import order
from app.routes.PaymentRoute import payment
from app.routes.UserRoute import user

# Khởi tạo AsyncEngine
engine = create_async_engine(settings.DATABASE_URL, echo=False)

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
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)
# Cấu hình CORSMiddleware
origins = [
    "http://localhost:3000",  # Thay đổi tùy theo frontend của bạn
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:8000/auth",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
app.include_router(admin.router)
app.include_router(author.router)
app.include_router(book.router)
app.include_router(category.router)
app.include_router(publishing_company.router)
app.include_router(translator.router)
app.include_router(photo.router)
app.include_router(user.router)
app.include_router(cart.router)
app.include_router(order.router)
app.include_router(payment.router)
app.include_router(address.router)
app.include_router(shipping.router)
app.include_router(sale_off.router)
app.include_router(review.router)
app.include_router(voucher.router)

@app.get("/")
async def read_root():
    return JSONResponse(content={"message": "Welcome!"})
    
def main():
    config = uvicorn.Config(
        "main:app", port=8000, log_level="info", reload=True
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
