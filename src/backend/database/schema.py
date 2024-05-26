from sqlmodel import SQLModel, Session, text
import sys


sys.path.append("../../../relative_face_recognition_app/server")
from models import *
from database.engine import engine

SQLModel.metadata.create_all(engine)

session = Session(engine)

session.exec(text("CREATE EXTENSION IF NOT EXISTS vector"))
