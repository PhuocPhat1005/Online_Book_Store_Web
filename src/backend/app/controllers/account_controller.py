from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.token import TokenData
from app.services.user_service import get_account_by_username, create_account
from app.database.database import get_db
from app.utils.security import decode_token

router = APIRouter()


@router.get("/account", response_model=TokenData)
async def read_account(token: str, db: AsyncSession = Depends(get_db)):
    username = decode_token(token)
    account = await get_account_by_username(db, username=username)
    return TokenData(username=account.username)
