from sqlalchemy import Column, String, UUID
from ..engine import Base

class Translator(Base):
    __tablename__ = 'translators'
    translator_id = Column(UUID, primary_key=True)
    full_name = Column(String(255), nullable=False)
    pen_name = Column(String(255))
