from pydantic import BaseModel


class ChannelSchama(BaseModel):
    name: str
    icon_type: str
    channel_id: int
    link: str
    admin_id: int


class UpdateChannelSchema(BaseModel):
    name: str | None = None
    icon_type: str | None = None
    channel_id: int | None = None
    link: str | None = None
    admin_id: int | None = None
    pinned_message_id: int | None = None
    