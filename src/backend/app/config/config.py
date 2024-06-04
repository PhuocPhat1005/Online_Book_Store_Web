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

    class Config:
        case_sensitive = True


settings = Settings()
