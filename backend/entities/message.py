from sqlalchemy import BigInteger, Column, ForeignKey, String, Boolean
from sqlalchemy.orm import declared_attr, relationship
from backend.entities.base_entity import BaseEntity


class Message(BaseEntity):
    __tablename__ = "messages"

    message_id = Column(BigInteger)
    channel_id = Column(ForeignKey("channels.id"), nullable=False)
    is_long_channel = Column(Boolean, nullable=False, default=True)
    text = Column(String, nullable=True)

    attachments = relationship(
        "Attachment",
        back_populates='message',
        uselist=True,
        lazy="selectin"
    )
    @declared_attr
    def channel(cls):
        return relationship("Channel", back_populates='messages')


class Attachment(BaseEntity):
    __tablename__ = "attachments"

    message_id = Column(ForeignKey("messages.id"))
    attachment_type = Column(String, nullable=False)
    attachment_id = Column(String, nullable=False)
    attachment_link = Column(String, nullable=False)
    message = relationship("Message", back_populates='attachments', uselist=False)