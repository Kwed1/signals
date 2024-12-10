from datetime import timedelta

from fastapi import Depends, HTTPException
import requests
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt, JWTError
from starlette import status

from backend.auth.models.app_user import AppUser
from backend.auth.schema.TokenSchema import TokenSchema
from backend.auth.service.token import TokenService
from backend.core.config import (
    oauth2_scheme,
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)
from backend.core.database import get_db
from backend.service.image_service import ImageService


class UserNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(detail="User not found", status_code=status.HTTP_404_NOT_FOUND)


class UserUnauthorizedException(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            detail="User unauthorized",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )


class InvalidCredentialsException(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


class AuthService:
    def __init__(
        self,
        db: AsyncSession = Depends(get_db),
        token_service: TokenService = Depends(),
        image_service: ImageService = Depends(),
    ):
        self.db = db
        self.image_service = image_service
        self.token_service = token_service

    async def authorized_user(self, token: str = Depends(oauth2_scheme)):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id: int = payload.get("user_id")
            username: str = payload.get("sub")
            if user_id is None or username is None:
                raise InvalidCredentialsException()
        except JWTError:
            raise InvalidCredentialsException()
        user = await self._get_user_by_telegram_id_async(telegram_id=int(user_id))
        if user is None:
            raise UserNotFoundException()
        return user.id

    async def get_user_id_async(self, token: str):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id: int = payload.get("user_id")

            user = await self._get_user_by_telegram_id_async(user_id)
            return user.id
        except Exception as ex:
            print(ex.args)

    async def sing_in_async(self, username: str, user_id: int):
        user = await self._get_user_by_telegram_id_async(telegram_id=user_id)
        if not user:
            user = await self._create_user(user_id, username)
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = self.token_service.create_access_token(
            data={"sub": user.username, "user_id": user.telegram_id, "is_admin": user.is_admin},
            expires_delta=access_token_expires,
        )

        return TokenSchema(token=access_token, avatar=(await self.image_service.get_avatar(user.telegram_id)))

    async def _create_user(self, telegram_id: int, username: str) -> AppUser:
        async with self.db as session:
            try:
                user = AppUser(telegram_id=telegram_id, username=username)
                session.add(user)
                await session.commit()
                await session.refresh(user)
                return user
            except Exception:
                await session.rollback()

        raise Exception("Try to authorize later")

    async def _get_user_by_telegram_id_async(self, telegram_id: int):
        user = (
            await self.db.execute(
                select(AppUser).filter(AppUser.telegram_id == telegram_id)
            )
        ).scalar_one_or_none()
        return user

    async def _user_exist(self, telegram_id: int) -> bool:
        user = await self._get_user_by_telegram_id_async(telegram_id=telegram_id)
        return user is not None
