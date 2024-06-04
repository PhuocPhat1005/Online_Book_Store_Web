from sqlalchemy.future import select
from sqlalchemy.orm import Session
from app.models.account import Account
from app.schemas.account import AccountCreate
from app.utils.security import get_password_hash


async def get_account_by_username(db: Session, username: str):
    query = select(Account).where(Account.username == username)
    result = await db.execute(query)
    return result.scalars().first()


async def create_account(db: Session, account: AccountCreate):
    hashed_password = get_password_hash(account.password)
    new_account = Account(
        username=account.username,
        email=account.email,
        password_hash=hashed_password,
    )
    db.add(new_account)
    await db.commit()
    await db.refresh(new_account)
    return new_account
