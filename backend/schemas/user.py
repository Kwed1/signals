from datetime import datetime
from pydantic import BaseModel


class UserSchema(BaseModel):
    username: str
    telegram_id: int
    subscription: str | None = None
    end_at: datetime

    @property
    def link(self) -> str:
        return f'https://t.me/{self.username}'