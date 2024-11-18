from fastapi import APIRouter, Depends

from backend.schemas.message import AddMessageSchema
from backend.service.message_service import MessageService


router = APIRouter()


@router.post('/')
async def add_message(form: AddMessageSchema, service: MessageService = Depends()):
    return await service.add_message(form)

