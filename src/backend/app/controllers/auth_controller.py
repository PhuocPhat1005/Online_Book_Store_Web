from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from requests import Session
from sqlalchemy.ext.asyncio import AsyncSession
from authlib.integrations.starlette_client import OAuth, OAuthError
from starlette.requests import Request
from app.schemas.token import Token
from app.schemas.account import AccountCreate
from app.utils.security import (
    create_access_token,
    create_refresh_token,
    verify_password,
    get_password_hash,
)
from app.services.user_service import (
    get_account_by_username,
    create_account,
    get_current_account,
)
from app.database.database import get_db
from app.config.config import settings
from uuid import uuid4
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse
import requests


router = APIRouter()
oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url=settings.GOOGLE_SERVER_METADATA_URL,
    client_kwargs={"scope": "openid email profile"},
)


def get_session(request: Request):
    return request.session


@router.get("/login/google", tags=["Authentication"])
async def google_login(request: Request, session: Session = Depends(get_session)):
    state = str(uuid4())
    redirect_uri = request.url_for("google_auth")
    session["oauth_state"] = state
    return await oauth.google.authorize_redirect(request, redirect_uri, state=state)


@router.get("/google-callback", name="google_auth", tags=["Authentication"])
async def google_auth(
    request: Request,
    session: Session = Depends(get_session),
    db: AsyncSession = Depends(get_db),
):
    try:
        token = await oauth.google.authorize_access_token(request)
        print("Token received:", token)

        # In giá trị của trạng thái từ yêu cầu
        request_state = request.query_params.get("state")
        print("Request state:", request_state)

        # In giá trị của trạng thái từ phản hồi
        response_state = session.get("oauth_state")
        print("Response state:", response_state)

        if response_state != request_state:
            raise HTTPException(
                status_code=400,
                detail="CSRF Warning! State not equal in request and response.",
            )
        # Xóa trạng thái khỏi phiên
        del session["oauth_state"]

        # Ensure 'id_token' exists in the token
        if "id_token" not in token:
            raise HTTPException(
                status_code=400, detail="ID token missing in the OAuth token."
            )

        user_info = await oauth.google.parse_id_token(request, token)
    except OAuthError as e:
        return {"error": e.error, "error_description": e.description}
    except Exception as e:
        return {"error": str(e)}

    username = user_info["email"]
    account = await get_account_by_username(db, username)

    if not account:
        account_data = AccountCreate(
            username=username,
            email=username,
            password=get_password_hash(username + "google"),
        )
        account = await create_account(db, account_data)

    access_token = create_access_token(data={"sub": account.username})
    refresh_token = create_refresh_token(data={"sub": account.username})

    return {"access_token": access_token, "refresh_token": refresh_token}


@router.post(
    "/sign_up",
    response_model=Token,
    summary="Sign up a new user account",
    description="Create a new user account and return an access token and a refresh token.",
)
async def sign_up(account: AccountCreate, db: AsyncSession = Depends(get_db)):
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


@router.get("/check_session")
async def check_session(request: Request):
    return {"session": dict(request.session)}


@router.post(
    "/sign_in",
    response_model=Token,
    summary="Sign in a user account",
    description="Sign in a user account and return an access token and a refresh token.",
)
async def sign_in(
    form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)
):
    user_account = await get_account_by_username(db, username=form_data.username)
    if not user_account:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not verify_password(form_data.password, user_account.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user_account.username})
    refresh_token = create_refresh_token(data={"sub": user_account.username})
    return {"access_token": access_token, "refresh_token": refresh_token}


@router.post("/reset_password", summary="Reset password", description="Reset password")
async def reset_password(
    username: str,
    new_password: str,
    account: AccountCreate = Depends(get_current_account),
    db: AsyncSession = Depends(get_db),
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
    return {"msg": "Password updated successfully!"}
