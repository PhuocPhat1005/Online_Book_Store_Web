from sqlalchemy import Column, UUID, ForeignKey, TIMESTAMP, Text
from ..engine import Base
from sqlalchemy.orm import relationship

class UserPhoto(Base):
    __tablename__ = 'user_photos'
    user_photo_id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('users.user_id'), nullable=False)
    photo = Column(Text)
    create_at = Column(TIMESTAMP)
    update_at = Column(TIMESTAMP)

    user = relationship('User', back_populates='photos')
