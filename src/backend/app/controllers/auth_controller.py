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


@router.post("/register", response_model=Token)
async def register(account: AccountCreate, db: AsyncSession = Depends(get_db)):
    db_account = await get_account_by_username(db, account.username)
    if db_account:
        raise HTTPException(
            status_code=400,
            detail="Username already registered",
        )
    await create_account(db, account)
    access_token = create_access_token(data={"sub": account.username})
    refresh_token = create_refresh_token(data={"sub": account.username})
    return {"access_token": access_token, "refresh_token": refresh_token}


@router.post("/token", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)
):
    account = await get_account_by_username(db, username=form_data.username)
    if not account or not verify_password(form_data.password, account.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": account.username})
    refresh_token = create_refresh_token(data={"sub": account.username})
    return {"access_token": access_token, "refresh_token": refresh_token}


@router.post("/reset-password")
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
    account.password_hash = hashed_password
    db.add(account)
    await db.commit()
    return {"msg": "Password updated successfully!!!"}
