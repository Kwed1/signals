from sqlalchemy import BigInteger, Column, String
from sqlalchemy.orm import declared_attr, relationship
from backend.entities.base_entity import BaseEntity
from backend.entities.message import Message


class Channel(BaseEntity):
    __tablename__ = "channels"

    name = Column(String, nullable=False)
    channel_id = Column(BigInteger, nullable=False, unique=True)
    link = Column(String,  nullable=False)
    pinned_message_id = Column(BigInteger, nullable=True)
    admin_id = Column(BigInteger, nullable=False)
    icon_type = Column(String, nullable=False)

    @declared_attr
    def messages(cls):
        return relationship("Message", back_populates="channel", lazy="selectin")
