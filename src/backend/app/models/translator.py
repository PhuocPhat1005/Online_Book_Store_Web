from sqlalchemy import Column, String
from app.database.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class Translator(Base):
    __tablename__ = "translators"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    full_name = Column(String(255), nullable=False)
    pen_name = Column(String(255))

    books = relationship("Book", secondary="book_translators", back_populates="translators")
    