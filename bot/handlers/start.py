from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

from bot.core.config import WEB_APP

router = Router()

@router.message(Command(commands=["start"]))
async def handle_start_(message: Message):
    button_start = InlineKeyboardButton(text="Start🚀", web_app=WebAppInfo(url=WEB_APP))
    keyboard = InlineKeyboardMarkup(inline_keyboard=[[button_start]])
    await message.answer(text='Start', parse_mode='HTML', reply_markup=keyboard)
