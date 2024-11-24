from pprint import pprint
from sqlalchemy import select
from backend.entities.channel import Channel
from backend.entities.message import Attachment, Message
from backend.exceptions.channel import ChannelNotFound
from backend.exceptions.message import MessageAlreadyExists
from backend.schemas.message import MessageSchema
from backend.service.base_service import BaseService


class MessageService(BaseService):
    async def _get_message(self, message_id: int):
        query = select(Message).where(Message.message_id == message_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def _get_channel(self, channel_id: int):
        query = select(Channel).where(Channel.channel_id == channel_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def add_message(self, form: MessageSchema):
        message = await self._get_message(form.message_id)
        if message:
            raise MessageAlreadyExists()
        
        channel = await self._get_channel(form.channel_id)
        if not channel:
            raise ChannelNotFound()
        
        form = form.model_dump()
        attachments = [Attachment(**attachment) for attachment in form.pop("attachments")]

        new_message = Message(**form, channel=channel, attachments=attachments)
        self.session.add(new_message)
        new_message = MessageSchema.model_validate(new_message, from_attributes=True)
        await self.session.commit()
        return new_message