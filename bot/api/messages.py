from aiohttp import ClientSession
from core.config import API_URL
from schemas.message import MessageSchema

from bot.core.config import TOKEN


async def create_message(message: MessageSchema):
    async with ClientSession() as session:
        async with session.post(
                f"{API_URL}/message", json=message.model_dump(),
                headers={"Authorization": f"Bearer {TOKEN}"}
                ) as response:
            if not response.status == 200:
                return {
                    "status": response.status,
                    "message": await response.json(),
                }
