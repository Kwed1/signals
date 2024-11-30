from enum import Enum
from pydantic import BaseModel
from pydantic import BaseModel

from backend.core.enums import DirectionTypes


class AttachmentTypes(str, Enum):
    photo = 'photo'
    document = 'document'
    video = 'video'
    audio = 'audio'
    

class AttachmentSchema(BaseModel):
    attachment_type: AttachmentTypes
    attachment_id: str
    attachment_link: str


class MessageSchema(BaseModel):
    message_id: int
    channel_id: int
    text: str | None = None
    attachments: list[AttachmentSchema]
    direction: str


class AddMessageSchema(BaseModel):
    message_id: int
    channel_id: int
    text: str | None = None
    attachments: list[AttachmentSchema] | None = None
    direction: DirectionTypes