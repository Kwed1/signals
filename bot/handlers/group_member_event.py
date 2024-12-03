from aiogram import Router
from aiogram.filters import ChatMemberUpdatedFilter, KICKED, MEMBER, LEFT
from aiogram.types import ChatMemberUpdated
import api.chat as chat_api
from schemas.chat import ChatMemberSchema

router = Router()

@router.chat_member(
    ChatMemberUpdatedFilter(member_status_changed=MEMBER)
)
async def handle_member_updates(update: ChatMemberUpdated):
    user = update.from_user
    if user.is_bot:
        return

    await chat_api.user_join_group(ChatMemberSchema(user_id=user.id))

@router.chat_member(
    ChatMemberUpdatedFilter(member_status_changed=(KICKED | LEFT))
)
async def handle_member_updates(update: ChatMemberUpdated):
    user = update.from_user
    if user.is_bot:
        return

    await chat_api.user_left_group(ChatMemberSchema(user_id=user.id))
