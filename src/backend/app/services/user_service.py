from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.account import Account
from app.schemas.account import AccountCreate
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from app.config.config import settings
from jose import jwt, JWTError
from app.database.database import get_db
# Send mail
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import uuid

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_account(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)
):
    try:
        payload = jwt.decode_token(token, settings.SECRET_KEY)
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=401, detail="Could not validate credentials"
            )
        account = await get_account_by_username(db, username=username)
        if account is None:
            raise HTTPException(
                status_code=401, detail="Could not validate credentials"
            )
        return account
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")


async def get_account_by_username(db: AsyncSession, username: str):
    # Find account by username
    query = select(Account).where(Account.username == username)
    result = await db.execute(query)
    account = result.scalars().first()
    print(f"Account: {account}")
    return account


async def get_account_by_email(db: AsyncSession, email: str):
    # Find account by email
    query = select(Account).where(Account.email == email)
    result = await db.execute(query)
    account = result.scalars().first()
    print(f"Account: {account}")
    return account

async def create_account(db: AsyncSession, account: AccountCreate):
    new_account = Account(
        id = uuid.uuid4(),
        username=account.username,
        email=account.email,
        password_hash=account.password,
    )
    db.add(new_account)
    try:
        # Commit the transaction
        await db.commit()
        # Refresh the instance to load the new ID from the database
        await db.refresh(new_account)
    except Exception as e:
        # Rollback the transaction if an error occurs
        await db.rollback()
        raise RuntimeError(f"Failed to create account: {e}") from e

    return new_account.id


async def send_email_to_user(receiver_email: str, your_subject: str, your_msg: str):
    msg = MIMEMultipart()
    msg["From"] = settings.MAIL_SENDER
    msg["To"] = receiver_email
    msg["Subject"] = your_subject

    msg.attach(MIMEText(your_msg, "plain"))

    try:
        # Connect to the Gmail SMTP server
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()  # Secure the connection
        server.login(settings.MAIL_SENDER, settings.MAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(settings.MAIL_SENDER, receiver_email, text)
        server.quit()

        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")


    