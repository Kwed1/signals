from enum import Enum
from pydantic import BaseModel


class AttachmentTypes(str, Enum):
    photo = 'photo'
    document = 'document'
    video = 'video'
    audio = 'audio'
    

class AttachmentSchema(BaseModel):
    attachment_type: AttachmentTypes
    attachment_id: str
    

class MessageSchema(BaseModel):
    message_id: int
    channel_id: int
    text: str | None = None
    attachments: list[AttachmentSchema]
    direction: str
