from sqlalchemy import Column, String, Text, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid



class Category(Base):
    __tablename__ = "categories"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    category_name = Column(String(50), unique=True, nullable=False)
    parent_category_id = Column(UUID, ForeignKey("categories.id", ondelete="SET NULL"))
    description = Column(Text)

    parent_category = relationship("Category", remote_side=[id], back_populates="subcategories")
    subcategories = relationship("Category", back_populates="parent_category", cascade="all, delete-orphan")
    books = relationship("Book", back_populates="category")
