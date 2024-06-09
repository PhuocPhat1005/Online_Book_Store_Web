from pydantic_settings import BaseSettings
from dotenv import dotenv_values

# Load các biến môi trường từ file .env
env_values = dotenv_values(".env")


class Settings(BaseSettings):
    DATABASE_URL: str = (
        f"postgresql+asyncpg://{env_values['DB_USER']}:{env_values['DB_PASSWORD']}@{env_values['DB_HOST']}:{env_values['DB_PORT']}/{env_values['DB_NAME']}"
    )
    SECRET_KEY: str = env_values.get(
        "SECRET_KEY", "4605MdCnG_DO6hVWefenXUy-7JmuPCMYKnrWA5pVZh4"
    )
    ALGORITHM: str = env_values.get("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        env_values.get("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
    )
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(env_values.get("REFRESH_TOKEN_EXPIRE_DAYS", 7))
    GOOGLE_CLIENT_ID: str = env_values.get(
        "GOOGLE_CLIENT_ID",
        "281043051253-mhrsn8j7oagearoc5ac1lrgu962v6vav.apps.googleusercontent.com",
    )
    GOOGLE_CLIENT_SECRET: str = env_values.get(
        "GOOGLE_CLIENT_SECRET", "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"
    )
    # GOOGLE_AUTH_URI: str = "https://accounts.google.com/o/oauth2/auth"
    # GOOGLE_TOKEN_URI: str = "https://oauth2.googleapis.com/token"
    # GOOGLE_USER_INFO: str = "https://www.googleapis.com/oauth2/v1/userinfo"
    GOOGLE_SERVER_METADATA_URL: str = (
        "https://accounts.google.com/.well-known/openid-configuration"
    )

    class Config:
        case_sensitive = True


settings = Settings()
