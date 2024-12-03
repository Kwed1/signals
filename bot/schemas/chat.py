from pydantic import BaseModel


class ChatMemberSchema(BaseModel):
    user_id: int

