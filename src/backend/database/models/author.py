from sqlalchemy import Column, String, Text, UUID
from ..engine import Base

class Author(Base):
    __tablename__ = 'authors'
    author_id = Column(UUID, primary_key=True)
    full_name = Column(String(255), nullable=False)
    pen_name = Column(String(255))
    description = Column(Text)
