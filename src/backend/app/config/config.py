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
        "803720744889-m0kk10jt16rcsvidoiuceqn1ho7ep816.apps.googleusercontent.com",
    )
    GOOGLE_CLIENT_SECRET: str = env_values.get(
        "GOOGLE_CLIENT_SECRET", "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"
    )
    GOOGLE_SERVER_METADATA_URL: str = (
        "https://accounts.google.com/.well-known/openid-configuration"
    )
    MAIL_SENDER: str = env_values["MAIL_SENDER"]
    MAIL_PASSWORD: str = env_values["MAIL_PASSWORD_APP"]

    Photo_directory: str = env_values["Photo_directory"]
    
    AWS_ACCESS_KEY_ID: str = env_values["AWS_ACCESS_KEY_ID"]
    AWS_SECRET_ACCESS_KEY: str = env_values["AWS_SECRET_ACCESS_KEY"]
    AWS_REGION: str = env_values["AWS_REGION"]
    AWS_BUCKET_NAME: str = env_values["AWS_BUCKET_NAME"]
    AWS_LINK: str = f"https://{AWS_BUCKET_NAME}.s3.amazonaws.com/"
    class Config:
        case_sensitive = True


settings = Settings()
