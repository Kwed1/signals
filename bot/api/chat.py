from aiohttp import ClientSession

from bot.core.config import TOKEN, API_URL
from bot.schemas.chat import ChatMemberSchema


async def user_join_group(schema: ChatMemberSchema):
    async with ClientSession() as session:
        async with session.post(
                f"{API_URL}/user/join", json=schema.model_dump(),
                headers={"Authorization": f"Bearer {TOKEN}"}
                ) as response:
            if not response.status == 200:
                return {
                    "status": response.status,
                }

async def user_left_group(schema: ChatMemberSchema):
    async with ClientSession() as session:
        async with session.post(
                f"{API_URL}/user/left", json=schema.model_dump(),
                headers={"Authorization": f"Bearer {TOKEN}"}
                ) as response:
            if not response.status == 200:
                return {
                    "status": response.status,
                }

