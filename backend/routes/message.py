from fastapi import APIRouter, Depends

from backend.schemas.message import AddMessageSchema
from backend.service.message_service import MessageService


router = APIRouter()


@router.post('/')
async def add_message(form: AddMessageSchema, service: MessageService = Depends()):
    return await service.add_message(form)

@router.put('/')
async def update_message(form: AddMessageSchema, service: MessageService = Depends()):
    return await service.update_message(form)

@router.delete('/')
async def update_message(message_id: int, service: MessageService = Depends()):
    return await service.remove_message(message_id)

