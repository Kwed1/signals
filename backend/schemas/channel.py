from uuid import UUID

from pydantic import BaseModel

from backend.schemas.message import MessageSchema


class ChannelSchama(BaseModel):
    id: UUID | None
    name: str
    icon_type: str
    long_channel_id: int
    long_link: str
    short_channel_id: int
    short_link: str
    last_message: MessageSchema | None = None
    pinned_message: MessageSchema | None = None


class CreateChannelSchema(BaseModel):
    name: str
    icon_type: str
    long_channel_id: int
    long_link: str
    short_channel_id: int
    short_link: str
    

class UpdateChannelSchema(BaseModel):
    name: str | None = None
    icon_type: str | None = None
    channel_id: int | None = None
    link: str | None = None
    admin_id: str | None = None
    pinned_message_id: int | None = None
    