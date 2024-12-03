from sqlalchemy import Column, BigInteger

from backend.entities.base_entity import BaseEntity


class Subscriber(BaseEntity):
    user_telegram_id = Column(BigInteger, nullable=False)