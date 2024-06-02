from sqlalchemy import Column, Text, UUID, TIMESTAMP, ForeignKey
from ..engine import Base
from sqlalchemy.orm import relationship

class BookPhoto(Base):
    __tablename__ = 'book_photos'
    book_photo_id = Column(UUID, primary_key=True)
    book_id = Column(UUID, ForeignKey('books.book_id'), nullable=False)
    photo = Column(Text)
    create_at = Column(TIMESTAMP)
    update_at = Column(TIMESTAMP)

    book = relationship('Book', back_populates='photos')
