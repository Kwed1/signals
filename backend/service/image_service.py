import httpx

from backend.core.config import BOT_TOKEN


class ImageService:
    def __init__(self):
        self.base_url = f"https://api.telegram.org/bot{BOT_TOKEN}"

    async def _fetch_data(self, url: str) -> dict:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url)
                response.raise_for_status()
                return response.json()
        except httpx.HTTPStatusError as e:
            raise
        except httpx.RequestError as e:
            raise

    async def get_user_profile_photos(self, user_id: int) -> dict:
        url = f"{self.base_url}/getUserProfilePhotos?user_id={user_id}"
        return await self._fetch_data(url)

    async def get_file_info(self, file_id: str) -> dict:
        url = f"{self.base_url}/getFile?file_id={file_id}"
        return await self._fetch_data(url)

    async def get_avatar(self, user_id: int) -> str:
        data = await self.get_user_profile_photos(user_id)

        if not data.get("ok") or data.get("result", {}).get("total_count", 0) == 0:
            return ""

        user_image_id = data["result"]["photos"][0][0]["file_id"]

        file_info = await self.get_file_info(user_image_id)
        if file_info.get("ok"):
            file_path = file_info["result"]["file_path"]
            return f"https://api.telegram.org/file/bot{self.bot_token}/{file_path}"

        return ""
