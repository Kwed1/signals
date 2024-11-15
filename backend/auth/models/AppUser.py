from sqlalchemy import Column, BigInteger, String

from backend.entities.base_entity import BaseEntity


class AppUser(BaseEntity):
    __tablename__ = "app_users"

    telegram_id = Column(BigInteger, unique=True, nullable=False)
    username = Column(String, nullable=False)