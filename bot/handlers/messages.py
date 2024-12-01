import logging
from pprint import pprint
import re
from aiogram import  Router
from aiogram.types import Message

from core.logger import get_logger
from schemas.message import AttachmentSchema, AttachmentTypes, MessageSchema
import api.messages as messages_api


router = Router()
logger = get_logger(__name__)


@router.message()
async def handle_media_message(message: Message):
    attacments = []
    ids = []
    if message.photo:
        for photo in message.photo:
            if not photo.file_id in ids:
                attacments.append(
                    AttachmentSchema(
                        attachment_type=AttachmentTypes.photo,
                        attachment_id=photo.file_id
                    )    
                )
                ids.append(photo.file_id)

    if message.document:
        attacments.append(
            AttachmentSchema(
                attachment_type=AttachmentTypes.document,
                attachment_id=message.document.file_id
            )
        )

    if message.video:
        attacments.append(
            AttachmentSchema(
                attachment_type=AttachmentTypes.video,
                attachment_id=message.video.file_id
            )
        )

    if message.audio:
        attacments.append(
            AttachmentSchema(
                attachment_type=AttachmentTypes.audio,
                attachment_id=message.audio.file_id
            )
        )
    
    if message.voice:
        attacments.append(
            AttachmentSchema(
                attachment_type=AttachmentTypes.audio,
                attachment_id=message.voice.file_id
            )
        )

    direction = re.findall(
        r"Direction:\s*(\w+)", message.text if not message.caption else
        message.caption
        )

    error = await messages_api.create_message(
        MessageSchema(
            message_id=message.message_id,
            channel_id=message.chat.id,
            text=message.text if not message.caption else
            message.caption,
            attachments=attacments,
            direction=direction[0] if direction else None
        )
    )

    if error:
        logger.error(f"Status: {error['status']}, Message: {error['message']["detail"]}")
