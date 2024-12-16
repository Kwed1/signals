import asyncio
import logging

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

import handlers
from core import config

async def main():
    bot = Bot(
        token=config.BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )

    dp = Dispatcher()

    dp.include_routers(handlers.group_event_handler_router)
    dp.include_routers(handlers.start_router)
    dp.include_routers(handlers.channel_post_handler)
    dp.include_routers(handlers.messages_router)
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())