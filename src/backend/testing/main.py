import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse
from httpx import AsyncClient
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

app = FastAPI()
templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def homepage(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/login")
async def login_with_google():
    google_auth_endpoint = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        "?response_type=code"
        f"&client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        "&scope=openid%20email%20profile"
        "&access_type=offline"
        "&prompt=consent"
    )
    return RedirectResponse(google_auth_endpoint)


@app.get("/auth")
async def google_auth(request: Request, code: str):
    async with AsyncClient() as client:
        token_endpoint = "https://oauth2.googleapis.com/token"
        token_data = {
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": REDIRECT_URI,
            "grant_type": "authorization_code",
        }
        token_response = await client.post(token_endpoint, data=token_data)
        token_response_data = token_response.json()

        if "error" in token_response_data:
            raise HTTPException(status_code=400, detail=token_response_data["error"])

        access_token = token_response_data["access_token"]
        id_info_endpoint = "https://www.googleapis.com/oauth2/v3/userinfo"
        id_info_response = await client.get(
            id_info_endpoint, headers={"Authorization": f"Bearer {access_token}"}
        )
        id_info_data = id_info_response.json()

        return id_info_data
