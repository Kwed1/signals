from pydantic import BaseModel


class AttachmentSchema(BaseModel):
    attachment_type: str
    attachment_id: int


class MessageSchema(BaseModel):
    message_id: int
    channel_id: int
    text: str
    attachments: list[AttachmentSchema]


class AddMessageSchema(BaseModel):
    message_id: int
    channel_id: int
    text: str | None = None
    attachments: list[AttachmentSchema] | None = None