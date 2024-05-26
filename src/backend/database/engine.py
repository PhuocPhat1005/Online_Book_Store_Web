import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from .db_conn import PostgreSQLConnection

load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

db_connection = PostgreSQLConnection(
    dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
)

db_connection.connect()

engine = create_engine(
    f"postgresql+psycopg2://{db_connection.user}:{db_connection.password}@{db_connection.host}:{db_connection.port}/{db_connection.dbname}",
    echo=True,
)
