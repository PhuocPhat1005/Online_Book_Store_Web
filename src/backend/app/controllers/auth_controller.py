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
    decode_token,
)
from app.services.user_service import (
    get_account_by_username,
    get_account_by_email,
    create_account,
    get_current_account,
    send_email_to_user,
)
from app.database.database import get_db
from app.config.config import settings
from uuid import uuid4
import jwt


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
    db: AsyncSession = Depends(get_db),
):
    try:
        token = await oauth.google.authorize_access_token(request)
        print("Token received: ", token)
        if not token:
            raise HTTPException(status_code=400, detail="Missing token from Google.")

        # Ensure 'id_token' exists in the token
        if "id_token" not in token:
            raise HTTPException(
                status_code=400, detail="ID token missing in the OAuth token."
            )

        # Validate state to protect against CSRF attacks
        request_state = request.query_params.get("state")
        response_state = request.session.get("oauth_state")
        if response_state != request_state:
            raise HTTPException(
                status_code=400,
                detail="CSRF Warning! State not equal in request and response.",
            )
        # Clear the state from the session
        del request.session["oauth_state"]

        # Use id_token to parse user info
        id_token = token["id_token"]
        print("ID Token: ", id_token)
        user_info = jwt.decode(
            id_token,
            options={"verify_signature": False},
            audience=settings.GOOGLE_CLIENT_ID,
        )
        print("User info received:", user_info)
        # Continue with your user handling logic
        username = user_info["name"]
        email = user_info["email"]
        picture = user_info["picture"]
        password = user_info["aud"]
        account = await get_account_by_username(db, username)

        if not account:
            account_data = AccountCreate(
                username=username,
                email=email,
                password=get_password_hash(password + "google"),
            )
            account = await create_account(db, account_data)

        access_token = create_access_token(data={"sub": account.username})
        refresh_token = create_refresh_token(data={"sub": account.username})

        return {"access_token": access_token, "refresh_token": refresh_token}
    except jwt.InvalidAudienceError:
        raise HTTPException(status_code=400, detail="Invalid audience in ID token.")
    except OAuthError as e:
        return {"error": e.error, "error_description": e.description}
    except Exception as e:
        return {"error": str(e)}


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
    db.add(account) #Xoa dong nay duoc k z
    await db.commit()
    return {"msg": "Password updated successfully!"}

@router.post(
    "/forgot_password", summary="Forgot password", description="Forgot password"
)
async def forgot_password(
    email: str, 
    db: AsyncSession = Depends(get_db),
):
    account = await get_account_by_email(db, email=email)
    if not account:
        raise HTTPException(
            status_code=404,
            detail="Account not found",
        )
    refresh_token = create_refresh_token(data={"sub": account.username})
    reset_link = f"https://your-frontend-domain.com/reset_password_by_email?token={refresh_token}"
    email_subject = "Reset your Password"
    await send_email_to_user(email, email_subject, reset_link)
    return {"msg": "Send password reset email to email: " + email + " link: " + reset_link}

@router.put(
    "/reset_password_by_email", summary = "Reset password by email", description = "Reset password by email"
)
async def reset_password_by_email(
    token: str,
    new_password: str,
    db: AsyncSession = Depends(get_db),
):
    try:
        user_name = decode_token(token)
        account = await get_account_by_username(db, user_name)

        if not account:
            raise HTTPException(
                status_code=404,
                detail="Account not found",
            )
        hashed_password = get_password_hash(new_password)
        
        account.password_hash = hashed_password
        await db.commit()
        return {"msg": "Password updated successfully!"}, 200
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=400,
            detail="Token expired",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=400,
            detail="Invalid Token",
        )