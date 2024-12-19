from pprint import pprint

import httpx
from fastapi import HTTPException
from sqlalchemy import select, func

from backend.core.config import TELEGRAM_API_URL, BOT_TOKEN
from backend.entities.channel import Channel
from backend.entities.message import Attachment, Message
from backend.exceptions.channel import ChannelNotFound
from backend.exceptions.message import MessageAlreadyExists, MessageNotFound
from backend.schemas.message import MessageSchema, AddMessageSchema
from backend.service.base_service import BaseService


class MessageService(BaseService):
    async def _get_message(self, message_id: int):
        query = select(Message).where(Message.message_id == message_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def _get_channel(self, channel_id: int):
        query = select(Channel).where(Channel.long_channel_id == channel_id
        or Channel.short_channel_id == channel_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def update_message(self, schema: AddMessageSchema):
        message = await self._get_message(schema.message_id)
        if message:
            raise MessageNotFound()

        message.text = schema.text
        await self.session.commit()

    async def remove_message(self, message_id: int):
        message = await self._get_message(message_id)
        if message:
            raise MessageNotFound()

        await self.session.delete(message)
        await self.session.commit()

    async def add_message(self, form: AddMessageSchema):
        channel = await self._get_channel(form.channel_id)
        if not channel:
            raise ChannelNotFound()
        
        attachments = [Attachment(
            attachment_link=(await self.get_attachment_link(
                attachment_id=attachment['attachment_id'])),
            attachment_id=attachment['attachment_id'],
            attachment_type=attachment['attachment_type']
        ) for attachment in form.attachments]

        new_message = Message(
            message_id=form.message_id,
            channel_id=channel.id,
            text=form.text,
            is_long_channel=True if form.message_id == channel.long_channel_id else False,
            attachments=attachments,
        )
        self.session.add(new_message)
        new_message = MessageSchema.model_validate(new_message, from_attributes=True)
        await self.session.commit()
        return new_message

    async def get_attachment_link(self, attachment_id: str):
        get_file_url = f"{TELEGRAM_API_URL}/getFile"
        async with httpx.AsyncClient() as client:
            response = await client.post(get_file_url, data={"file_id": attachment_id})

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Ошибка при запросе к Telegram API")

        result = response.json()
        if not result.get("ok"):
            raise HTTPException(status_code=400, detail="Некорректный file_id")

        file_path = result["result"]["file_path"]

        file_url = f"https://api.telegram.org/file/bot{BOT_TOKEN}/{file_path}"
        async with httpx.AsyncClient() as client:
            file_response = await client.get(file_url)

        if file_response.status_code != 200:
            raise HTTPException(status_code=500, detail="Error while downloading file")

        return file_url

    async def search_message(self, text: str, skip: int = 0, take: int = 10):
        if len(text) < 3:
            raise Exception('Minimum 3 symbols')

        stmt = select(Message).where(
            func.lower(Message.text).contains(func.lower(text))
        ).limit(take).offset(skip)

        result = await self.session.execute(stmt)
        messages = result.scalars().all()

        count_stmt = select(func.count()).select_from(Message).where(
            func.lower(Message.text).contains(func.lower(text))
        )
        total_result = await self.session.execute(count_stmt)
        total = total_result.scalar()

        return {
            "messages": [MessageSchema.model_validate(message, from_attributes=True) for message in
                         messages],
            "total": total
        }

