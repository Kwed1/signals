from aiohttp import ClientSession
from core.config import API_URL
from schemas.message import MessageSchema


test_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJ1c2VyX2lkIjowLCJleHAiOjE3MzI2MzAwNjB9.EAjNn02klBX0LC82Gm73hj6C1OLoddM2MAxXGQNR7Vo'

async def create_message(message: MessageSchema):
    async with ClientSession() as session:
        async with session.post(f"{API_URL}/message", json=message.model_dump(), headers={"Authorization": f"Bearer {test_token}"}) as response:
            if not response.status == 200:
                return {
                    "status": response.status,
                    "message": await response.json(),
                }