from aiohttp import ClientSession
from core.config import API_URL
from schemas.message import MessageSchema


async def create_message(message: MessageSchema):
    async with ClientSession() as session:
        async with session.post(f"{API_URL}/message", json=message.model_dump()) as response:
            if response.status == 200:
                return await response.json()
            return {
                "status": "error",
                "message": await response.text(),
            }