from sqlalchemy.future import select
from sqlalchemy.orm import Session
from app.models.account import Account
from app.schemas.account import AccountCreate
from app.utils.security import get_password_hash


async def get_account_by_username(db: Session, username: str):
    # Find account by username
    query = select(Account).where(Account.username == username)
    result = await db.execute(query)
    account = result.scalars().first()
    return account


async def create_account(db: Session, account: AccountCreate):
    # Hash the password before storing it
    hashed_password = get_password_hash(account.password)
    # Create a new account
    new_account = Account(
        username=account.username,
        email=account.email,
        password_hash=hashed_password,
    )
    db.add(new_account)
    try:
        # Commit the transaction
        await db.commit()
    except Exception as e:
        # Rollback the transaction if an error occurs
        await db.rollback()
        raise RuntimeError(f"Failed to create account: {e}") from e
    try:
        # Refresh the account
        await db.refresh(new_account)
    except Exception as e:
        # Refresh the account if an error occurs
        raise RuntimeError(f"Failed to refresh account: {e}") from e
    return new_account
