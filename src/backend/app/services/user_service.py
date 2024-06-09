from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.account import Account
from app.schemas.account import AccountCreate
from app.utils.security import get_password_hash


async def get_account_by_username(db: AsyncSession, username: str):
    # Find account by username
    query = select(Account).where(Account.username == username)
    result = await db.execute(query)
    account = result.scalars().first()
    print(f"Account: {account}")
    return account


async def create_account(db: AsyncSession, account: AccountCreate):
    # Create a new account
    new_account = Account(
        username=account.username,
        email=account.email,
        password_hash=account.password,
    )
    db.add(new_account)
    try:
        # Flush changes to database
        await db.flush()
        # Commit the transaction
        await db.commit()
    except Exception as e:
        # Rollback the transaction if an error occurs
        await db.rollback()
        raise RuntimeError(f"Failed to create account: {e}") from e
    return new_account
