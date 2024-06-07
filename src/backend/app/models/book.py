from sqlalchemy import (
    Column,
    String,
    Text,
    Date,
    DECIMAL,
    Integer,
    ForeignKey,
    TIMESTAMP,
)
from app.database.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Book(Base):
    __tablename__ = "books"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    book_name = Column(String(255), nullable=False)
    isbn = Column(String(50), nullable=False, unique=True)
    publishing_company_id = Column(
        UUID, ForeignKey("publishing_companies.id"), nullable=False
    )
    publishing_date = Column(Date)
    category_id = Column(UUID, ForeignKey("categories.id"))
    price = Column(DECIMAL(10, 2), nullable=False)
    language = Column(String(100), nullable=False)
    book_size = Column(String(20), nullable=False)
    page_number = Column(Integer, nullable=False)
    book_cover_type = Column(String(10), nullable=False)
    description = Column(Text)
    create_at = Column(TIMESTAMP)
    update_at = Column(TIMESTAMP)

    publishing_company = relationship("PublishingCompany", back_populates="books")
    category = relationship("Category", back_populates="books")
    photos = relationship("BookPhoto", back_populates="book")
