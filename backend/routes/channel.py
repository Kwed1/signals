from fastapi import APIRouter, Depends

from backend.core.enums import DirectionTypes
from backend.schemas.channel import ChannelSchama, UpdateChannelSchema
from backend.service.channel_service import ChannelService


router = APIRouter()


@router.get("/", response_model=list[ChannelSchama])
async def get_channels(service: ChannelService = Depends()):
    return await service.get_all_channels()

@router.get('/{channel_id}', response_model=ChannelSchama)
async def get_channel(channel_id: int, service: ChannelService = Depends()):
    return await service.get_channel(channel_id)


@router.post("/", response_model=ChannelSchama)
async def add_channel(form: ChannelSchama, service: ChannelService = Depends()):
    return await service.add_channel(form)


@router.put("/{channel_id}", response_model=ChannelSchama)
async def update_channel(
    channel_id: int, form: UpdateChannelSchema, service: ChannelService = Depends()
):
    return await service.update_channel(channel_id, form)


@router.delete("/{channel_id}")
async def delete_channel(channel_id: int, service: ChannelService = Depends()):
    await service.delete_channel(channel_id)
    return {
        "message": f"Channel {channel_id} deleted successfully"
    }


@router.get('/{channel_id}/messages')
async def get_channel_messages(
    channel_id: int, 
    service: ChannelService = Depends(), 
    limit: int = 10, 
    offset: int = 0,
    direction: DirectionTypes = DirectionTypes.LONG
):
    return await service.get_channel_messages(channel_id, limit, offset, direction)