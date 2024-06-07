from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.token import TokenData
from app.services.user_service import get_account_by_username
from app.database.database import get_db
from app.utils.security import decode_token

router = APIRouter()


# API from backend to database for reading account data
@router.get(
    "/account",
    response_model=TokenData,
    summary="Retrieve account details by providing a JWT token. The token will be decoded to get the username, and the account details will be fetched from the database.",
    description="The account details, including the username.",
)
async def read_account(token: str, db: AsyncSession = Depends(get_db)):
    """
    Get account details by providing a JWT token.

    - **token**: A JWT token that will be decoded to extract the username.
    - **db**: The database session.

    Returns the account details, including the username.
    """
    try:
        username = decode_token(token)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Invalid token",
        )

    account = await get_account_by_username(db, username=username)

    if not account:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )
    return TokenData(username=account.username)
