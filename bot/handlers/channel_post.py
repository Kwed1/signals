import re

from aiogram import Router
from aiogram.types import Message

from backend.schemas.message import AttachmentSchema, AttachmentTypes, MessageSchema
from bot.core.logger import get_logger
import api.messages as messages_api

router = Router()
logger = get_logger(__name__)


@router.channel_post()
async def on_channel_post(message: Message):
    attacments = []
    ids = []
    if message.photo:
        if not message.photo[-1] in ids:
            attacments.append(
                AttachmentSchema(
                    attachment_type=AttachmentTypes.photo,
                    attachment_id=message.photo[-1].file_id
                )
            )
            ids.append(message.photo[-1].file_id)

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

    text = message.text if not message.caption else message.caption
    direction = None
    if text is not None and text != '':
        direction = re.findall(
            r"Direction:\s*(\w+)", text
        )

    error = await messages_api.create_message(
        MessageSchema(
            message_id=message.message_id,
            channel_id=message.chat.id,
            text=text,
            attachments=attacments,
            direction=direction[0] if direction else None
        )
    )

    if error:
        logger.error(f"Status: {error['status']}, Message: {error['message']["detail"]}")


