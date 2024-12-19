from sqlalchemy import select, update

from backend.core.enums import DirectionTypes
from backend.entities.channel import Channel
from backend.entities.message import Message
from backend.exceptions.channel import ChannelAlreadyExists, ChannelNotFound
from backend.exceptions.message import MessageNotFound
from backend.schemas.channel import ChannelSchama, UpdateChannelSchema
from backend.schemas.message import MessageSchema
from backend.service.base_service import BaseService


class ChannelService(BaseService):
    async def _model_validate_chanel(self, channel: Channel):
        pinned_message = (
            await self.session.execute(
                select(Message).where(Message.message_id == channel.pinned_message_id)
            )
        ).scalar_one_or_none()
        return ChannelSchama(
            id=channel.id,
            name=channel.name,
            icon_type=channel.icon_type,
            long_channel_id=channel.long_channel_id,
            short_channel_id=channel.short_channel_id,
            short_link=channel.short_link,
            long_link=channel.long_link,
            last_message=MessageSchema.model_validate(
                channel.messages[-1], from_attributes=True
            ) if channel.messages else None,
            pinned_message=MessageSchema.model_validate(
                pinned_message, from_attributes=True
            ) if pinned_message else None
        )
    
    async def get_all_channels(self):
        query = select(Channel)
        channels = (await self.session.execute(query)).scalars().all()
        return [await self._model_validate_chanel(channel) for channel in channels]
    
    async def _get_channel(self, channel_id: int):
        query = select(Channel).where(Channel.long_channel_id == channel_id or
                                      Channel.short_channel_id == channel_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def get_channel(self, channel_id: int):
        channel = await self._get_channel(channel_id)
        if not channel:
            raise ChannelNotFound()
        return await self._model_validate_chanel(channel)

    async def add_channel(self, form: ChannelSchama):
        channel = await self._get_channel(form.long_channel_id)

        if channel:
            raise ChannelAlreadyExists()

        channel = await self._get_channel(form.short_channel_id)
        if channel:
            raise ChannelAlreadyExists()

        new_channel = Channel(**form.model_dump(exclude_unset=True))
        self.session.add(new_channel)
        await self.session.commit()
        await self.session.refresh(new_channel)
        new_channel = await self._model_validate_chanel(new_channel)
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
        channel = await self._model_validate_chanel(channel)
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
        offset: int,
        direction: DirectionTypes | None = None,
    ) -> list[MessageSchema]:
        query = select(Message).where(Message.channel_id == channel_id).order_by(Message.create_at.desc())

        if direction:
            query = query.where(Message)
        query = query.limit(limit).offset(offset)
        result = await self.session.execute(query)
        messages = result.scalars().all()
        return [MessageSchema.model_validate(message, from_attributes=True) for message in messages]
    
    async def pin_message(self, channel_id: int, message_id: int):
        new_pinned_message = (
            await self.session.execute(
                select(Message).where(Message.message_id == message_id)
            )
        ).scalar_one_or_none()
        if not new_pinned_message:
            raise MessageNotFound()
        
        channel = await self._get_channel(channel_id)
        channel.pinned_message_id = message_id
        channel_model = await self._model_validate_chanel(channel)

        await self.session.commit()
        return channel_model