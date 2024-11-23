from sqlalchemy import select
from backend.auth.models.app_user import AppUser
from backend.schemas.user import UserSchema
from backend.service.base_service import BaseService


class UserService(BaseService):
    async def get_all_users(self):
        users = (await self.session.execute(select(AppUser))).scalars().all()
        return [UserSchema.model_validate(user, from_attributes=True) for user in users]
        