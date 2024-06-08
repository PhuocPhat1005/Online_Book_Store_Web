from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.token import Token
from app.schemas.account import AccountCreate
from app.utils.security import (
    create_access_token,
    create_refresh_token,
    verify_password,
    get_password_hash,
)
from app.services.user_service import get_account_by_username, create_account
from app.database.database import get_db

router = APIRouter()


# API from backend to database for signing up a new account
@router.post(
    "/sign_up",
    response_model=Token,
    summary="Sign up a new user account",
    description="Create a new user account and return an access token and a refresh token.",
)
async def sign_up(account: AccountCreate, db: AsyncSession = Depends(get_db)):
    """
    Sign up a new user account.

    - **username**: Unique username for the user
    - **email**: Unique email address of the user
    - **password**: Password for the user account

    Returns a JSON response with the access token and refresh token.
    """
    db_user_account = await get_account_by_username(db, account.username)
    if db_user_account:
        raise HTTPException(
            status_code=400,
            detail="Username already registered",
        )
    account.password = get_password_hash(account.password)
    await create_account(db, account)
    access_token = create_access_token(data={"sub": account.username})
    refresh_token = create_refresh_token(data={"sub": account.username})
    return {"access_token": access_token, "refresh_token": refresh_token}


# API from backend to database for signing in a user account
@router.post(
    "/sign_in",
    response_model=Token,
    summary="sign in a user account",
    description="Sign in a user account and return an access token and a refresh token.",
)
async def sign_in(
    form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)
):
    """
    Sign in a user account.

    - **username**: Username of the user account
    - **password**: Password of the user account

    Returns a JSON response with the access token and refresh token.
    """
    user_account = await get_account_by_username(db, username=form_data.username)
    if not user_account or not verify_password(
        form_data.password, user_account.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user_account.username})
    refresh_token = create_refresh_token(data={"sub": user_account.username})
    return {"access_token": access_token, "refresh_token": refresh_token}


# API from Backend to Database for resetting password
@router.post("/reset_password", summary="Reset password", description="Reset password")
async def reset_password(
    username: str, new_password: str, db: AsyncSession = Depends(get_db)
):
    account = await get_account_by_username(db, username=username)
    if not account:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )
    hashed_password = get_password_hash(new_password)
    account.password = hashed_password
    db.add(account)
    await db.commit()
    return {"msg": "Password updated successfully!!!"}
