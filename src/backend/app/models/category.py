from sqlalchemy import Column, String, Text, UUID, ForeignKey
from app.database.database import Base
from sqlalchemy.orm import relationship


class Category(Base):
    __tablename__ = "categories"
    category_id = Column(UUID, primary_key=True)
    category_name = Column(String(50), nullable=False)
    parent_category_id = Column(UUID, ForeignKey("categories.category_id"))
    description = Column(Text)

    parent_category = relationship("Category", remote_side=[category_id])
    books = relationship("Book", back_populates="category")
