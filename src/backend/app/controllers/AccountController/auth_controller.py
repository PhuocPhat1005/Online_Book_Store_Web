from fastapi import APIRouter, Response, Cookie, Depends, HTTPException, status, Query
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from authlib.integrations.starlette_client import OAuth, OAuthError
from starlette.requests import Request
from app.schemas.TokenSchemas.token import Token
from app.schemas.AccountSchemas.account import (
    AccountCreate,
    UserEmail,
    ResetPasswordForm,
)
from app.utils.security import (
    create_access_token,
    create_refresh_token,
    verify_password,
    get_password_hash,
    decode_token,
)
from app.services.UserService.user_service import (
    get_account_by_username,
    get_account_by_email,
    create_account,
    get_current_account,
    send_email_to_user,
)

from app.schemas.UserSchemas.user import (
    UserCreate,
    UserUpdate,
    UserResponse,
)
from app.services.CRUDService.crud_service import CRUDService, ReadService
from app.models.user import User
from app.models.admin import Admin
from app.database.database import get_db
from app.config.config import settings
from uuid import uuid4
import jwt
from datetime import timedelta
from fastapi.responses import JSONResponse
from jose import JWTError, jwt
import requests

import logging
import uuid
from datetime import datetime
user_service = CRUDService[User, UserCreate, UserUpdate](User)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()
oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url=settings.GOOGLE_SERVER_METADATA_URL,
    client_kwargs={"scope": "openid email profile"},
    access_type="offline",
    prompt="consent",
)


def get_session(request: Request):
    return request.session


def get_google_public_keys():
    url = "https://www.googleapis.com/oauth2/v3/certs"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(
            status_code=500, detail="Unable to fetch Google's public keys."
        )
    return response.json()


def decode_token(id_token):
    try:
        # Fetch Google's public keys
        public_keys = get_google_public_keys()

        # Decode the token header to get the key ID (kid)
        unverified_header = jwt.get_unverified_header(id_token)
        kid = unverified_header.get("kid")

        if not kid:
            raise HTTPException(
                status_code=400, detail="No 'kid' found in token header."
            )

        # Find the appropriate public key
        key = next((key for key in public_keys["keys"] if key["kid"] == kid), None)
        if not key:
            raise HTTPException(status_code=400, detail="Public key not found.")

        # Decode the token using the public key
        decoded_token = jwt.decode(
            id_token,
            key,
            algorithms=["RS256"],
            audience=settings.GOOGLE_CLIENT_ID,
            options={"verify_at_hash": False},
        )
        return decoded_token
    except JWTError as e:
        raise HTTPException(status_code=400, detail=f"JWT Error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error decoding token: {str(e)}")


@router.get("/login/google", tags=["Authentication"])
async def initiate_google_login(request: Request):
    state = str(uuid4())
    print(f"State: {state}\n\n")
    redirect_uri = request.url_for("google_auth")
    print(f"Redirect uri: {redirect_uri}\n\n")
    request.session["oauth_state"] = state
    print(f"Request Session: {dict(request.session.items())}\n\n")
    print(f"Request: {dict(request.items())}\n\n")
    google_auth_url = await oauth.google.authorize_redirect(
        request, redirect_uri, state=state
    )
    print(f"Google Auth Url: {google_auth_url}\n\n")
    return {
        "state": request.session.get("oauth_state"),
        "redirect_uri": redirect_uri,
        "google_auth_url": google_auth_url,
    }


@router.get("/google-callback", name="google_auth", tags=["Authentication"])
async def google_auth(request: Request, db: AsyncSession = Depends(get_db)):
    try:
        print("Check 00\n\n")
        request_state = request.query_params.get("state")
        print(f"Request state: {request_state}\n")
        response_state = request.session.get("oauth_state", None)
        response_state = request.cookies.get("gfg_cookie_key")
        # token = await oauth.google.authorize_access_token(request_state)
        # print(token)
        print(f"Response state: {response_state}\n")
        print(f"Session in callback: {request.session.items()}")

        if response_state != request_state:
            raise HTTPException(
                status_code=400,
                detail="CSRF Warning! State not equal in request and response.",
            )
        del request.session["oauth_state"]

        token = await oauth.google.authorize_access_token(request)
        print("Check 02\n\n")
        print("Token:", token)

        if not token:
            raise HTTPException(status_code=400, detail="Missing token from Google.")

        if "access_token" not in token:
            raise HTTPException(status_code=400, detail="Missing access token.")

        if "id_token" not in token:
            raise HTTPException(
                status_code=400, detail="ID token missing in the OAuth token."
            )

        id_token = token["id_token"]
        access_token = token["access_token"]

        print("ID Token: ", id_token)
        print("Access Token: ", access_token)

        # Decode the ID token
        decoded_token = decode_token(id_token)
        print("decoded_token: ", decoded_token)

        # Validate the audience
        if decoded_token.get("aud") != settings.GOOGLE_CLIENT_ID:
            raise HTTPException(status_code=400, detail="Invalid audience in ID token.")

        username = decoded_token["name"]
        email = decoded_token["email"]
        password = decoded_token[
            "sub"
        ]  # Using 'sub' as a part of password hash to ensure uniqueness

        account = await get_account_by_email(db, email)

        if not account:
            account_data = AccountCreate(
                username=username,
                email=email,
                password=get_password_hash(password + "google"),
            )
            account = await create_account(db, account_data)

        custom_access_token = create_access_token(data={"sub": account.username})
        custom_refresh_token = create_refresh_token(data={"sub": account.username})

        return {
            "access_token": custom_access_token,
            "refresh_token": custom_refresh_token,
        }
    except JWTError as e:
        raise HTTPException(status_code=400, detail=f"JWT Error: {str(e)}")
    except OAuthError as e:
        return {"error": e.error, "error_description": e.description}
    except Exception as e:
        return {"error": str(e)}

@router.post(
    "/sign_up",
    summary="Sign up a new user account form, not verfiy email yet",
)
async def sign_up(account: AccountCreate, db: AsyncSession = Depends(get_db)):
    db_user_account = await get_account_by_username(db, account.username)
    if db_user_account:
        raise HTTPException(
            status_code=400,
            detail="Username already registered",
        )
    db_user_account = await get_account_by_email(db, account.email)
    if db_user_account:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )
    account.password = get_password_hash(account.password)
    await send_email_to_user(account.email, "Welcome to our website", "Follow link to signing up!", f"http://localhost:3000/signup") 
    # return account
    new_id = await create_account(db, account)
    access_token = create_access_token(data={"sub": account.username})
    refresh_token = create_refresh_token(data={"sub": account.username})
    user = UserCreate(account_id=new_id)
    user.cart_id = uuid.uuid4()
    await user_service.create(user, db)
    return {"access_token": access_token, "refresh_token": refresh_token}


@router.post("/signup", summary="Sign up a new user account", description="Create a new user account")
async def sign_up(account: AccountCreate, db: AsyncSession = Depends(get_db)):
    new_id = await create_account(db, account)
    access_token = create_access_token(data={"sub": account.username})
    refresh_token = create_refresh_token(data={"sub": account.username})
    user = UserCreate(account_id=new_id)
    user.cart_id = uuid.uuid4()
    await user_service.create(user, db)
    return {"access_token": access_token, "refresh_token": refresh_token}


@router.get("/check_session")
async def check_session(request: Request):
    print("\n\n")
    print("Check session: ", dict(request.session))
    print("\n\n")
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
        user_account = await get_account_by_email(db, email=form_data.username)
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
    if user_account.banned_to:
        if user_account.banned_to > datetime.now():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Your account has been banned to {user_account.banned_to}.",
            )
        else:
            user_account.banned_to = None
            db.add(user_account)
            await db.commit()

    return {"access_token": access_token, "refresh_token": refresh_token}

@router.post("/sign_in_as_admin", summary="Sign in as admin", description="Sign in as admin")
async def sign_in_as_admin(
    form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)
):
    read_admin_service = ReadService[Admin](Admin)
    admin = await read_admin_service.get_by_condition([{"admin_name": form_data.username}], db)
    if admin:
        admin = admin[0]
        if not verify_password(form_data.password, admin.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password",
                headers={"WWW-Authenticate": "Bearer"},
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"msg": "Login successfully!"}

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
    # db.add(account)  # Xoa dong nay duoc k z
    await db.commit()
    return {"msg": "Password updated successfully!"}


@router.post(
    "/forgot_password", summary="Forgot password", description="Forgot password"
)
async def forgot_password(
    form_data: UserEmail,
    db: AsyncSession = Depends(get_db),
):
    account = await get_account_by_email(db, email=form_data.email)
    if not account:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )
    expiration_minute = 5
    reset_token = create_access_token(
        data={"sub": account.username},
        expires_delta=timedelta(minutes=expiration_minute),
    )
    reset_link = f"http://localhost:3000/signin/forgotpassword/?token={reset_token}"
    email_subject = "Reset your Password"
    message = f"Click the link to reset your password. Your link will expire in {expiration_minute} minutes. If you did not request this, please ignore this email."
    await send_email_to_user(form_data.email, email_subject, message, reset_link)
    return reset_token


@router.put(
    "/reset_password_by_email/",
    summary="Reset password by email",
    description="Reset password by email",
)
async def reset_password_by_email(
    form_data: ResetPasswordForm,
    db: AsyncSession = Depends(get_db),
):
    try:
        user_name = decode_token(form_data.token)
    except JWTError as e:
        error_message = str(e)
        if "expired" in error_message:
            return JSONResponse(status_code=400, content={"detail": "Token expired"})
        elif "invalid" in error_message or "credentials" in error_message:
            return JSONResponse(status_code=400, content={"detail": "Invalid Token"})
        else:
            return JSONResponse(status_code=400, content={"detail": error_message})

    account = await get_account_by_username(db, user_name)

    if not account:
        return JSONResponse(status_code=404, content={"detail": "Account not found"})

    hashed_password = get_password_hash(form_data.password)
    account.password_hash = hashed_password
    await db.commit()

    return {"msg": "Password updated successfully!"}


@router.get(
    "/get_test_access_token",
    summary="Get test access token",
    description="Get access token",
)
async def get_access_token(username: str):
    access_token = create_access_token(data={"sub": username})
    return {"test_access_token": access_token}
