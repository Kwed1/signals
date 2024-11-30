from pprint import pprint

import httpx
from fastapi import HTTPException
from sqlalchemy import select

from backend.core.config import TELEGRAM_API_URL, BOT_TOKEN
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
        attachments = [Attachment(
            attachment_link=(await self.get_attachment_link(
                attachment_id=attachment.attachment_id)),
            attachment_id=attachment.attachment_id,
            attachment_type=attachment.attachment_type
        ) for attachment in form.pop("attachments")]

        new_message = Message(**form, channel=channel, attachments=attachments)
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
