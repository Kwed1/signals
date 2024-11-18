from sqlalchemy import select, update

from backend.entities.channel import Channel
from backend.entities.message import Message
from backend.exceptions.channel import ChannelAlreadyExists, ChannelNotFound
from backend.schemas.channel import ChannelSchama, UpdateChannelSchema
from backend.schemas.message import MessageSchema
from backend.service.base_service import BaseService


class ChannelService(BaseService):
    async def _get_channel(self, channel_id: int):
        query = select(Channel).where(Channel.channel_id == channel_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def get_channel(self, channel_id: int):
        channel = await self._get_channel(channel_id)
        if not channel:
            raise ChannelNotFound()
        return ChannelSchama.model_validate(channel, from_attributes=True)

    async def add_channel(self, form: ChannelSchama):
        channel = await self._get_channel(form.channel_id)

        if channel:
            raise ChannelAlreadyExists()

        new_channel = Channel(**form.model_dump())
        self.session.add(new_channel)
        new_channel = ChannelSchama.model_validate(new_channel, from_attributes=True)
        await self.session.commit()
        return new_channel

    async def update_channel(self, channel_id: int, form: UpdateChannelSchema):
        channel = await self._get_channel(channel_id)
        
        if not channel:
            raise ChannelNotFound()

        query = (
            update(Channel)
            .where(Channel.channel_id == channel_id)
            .values(**form.model_dump(exclude_none=True))
            .returning(Channel)
        )
        result = await self.session.execute(query)
        channel = result.scalar_one_or_none()
        channel = ChannelSchama.model_validate(channel, from_attributes=True)
        await self.session.commit()
        return channel

    async def delete_channel(self, channel_id: int):
        channel = await self._get_channel(channel_id)

        if not channel:
            raise ChannelNotFound()

        await self.session.delete(channel)
        await self.session.commit()
        return 
    

    async def get_channel_messages(
        self, 
        channel_id: int,
        limit: int, 
        offset: int
    ) -> list[MessageSchema]:
        query = select(Message).where(
            Message.channel_id == channel_id
        ).limit(limit).offset(offset)
        result = await self.session.execute(query)
        messages = result.scalars().all()
        return [MessageSchema.model_validate(message, from_attributes=True) for message in messages]