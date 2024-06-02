# import os
# from dotenv import load_dotenv
# from sqlalchemy import create_engine
# from backend.database.db_conn import PostgreSQLConnection  # Absolute import

# # Load environment variables from .env file
# load_dotenv()

# # Get environment variables
# DB_NAME = os.getenv("DB_NAME")
# DB_USER = os.getenv("DB_USER")
# DB_PASSWORD = os.getenv("DB_PASSWORD")
# DB_HOST = os.getenv("DB_HOST")
# DB_PORT = os.getenv("DB_PORT")

# # Debugging: Print the loaded environment variables
# print(f"DB_NAME: {DB_NAME}")
# print(f"DB_USER: {DB_USER}")
# print(f"DB_PASSWORD: {DB_PASSWORD}")
# print(f"DB_HOST: {DB_HOST}")
# print(f"DB_PORT: {DB_PORT}")

# # Create a PostgreSQLConnection instance
# db_connection = PostgreSQLConnection(
#     dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
# )

# # Connect to the database
# db_connection.connect()

# # Create an SQLAlchemy engine
# engine = create_engine(
#     f"postgresql+psycopg2://{db_connection.user}:{db_connection.password}@{db_connection.host}:{db_connection.port}/{db_connection.dbname}",
#     echo=True,
# )



from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
