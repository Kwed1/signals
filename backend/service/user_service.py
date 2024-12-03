from sqlalchemy import select
from backend.auth.models.app_user import AppUser
from backend.entities.subscribers import Subscriber
from backend.exceptions.user import UserAlreadyExists, UserNotFound
from backend.schemas.user import UserSchema
from backend.service.base_service import BaseService


class UserService(BaseService):
    async def get_all_users(self):
        users = (await self.session.execute(select(AppUser))).scalars().all()
        return [UserSchema.model_validate(user, from_attributes=True) for user in users]

    async def get_subscriber(self, user_id: int):
        return (
            await self.session.execute(
                select(Subscriber).where(Subscriber.user_telegram_id == user_id)
            )
        ).scalars().first()

    async def user_subscribe(self, user_id: int):
        if await self.get_subscriber(user_id) is not None:
            raise UserAlreadyExists()

        self.session.add(Subscriber(user_telegram_id=user_id))
        await self.session.commit()

    async def user_unsubscribe(self, user_id: int):
        subscriber = await self.get_subscriber(user_id)
        if subscriber is None:
            raise UserNotFound()

        await self.session.delete(subscriber)
        await self.session.commit()
