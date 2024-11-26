from datetime import datetime
from sqlalchemy import Boolean, Column, BigInteger, DateTime, String

from backend.entities.base_entity import BaseEntity


class AppUser(BaseEntity):
    __tablename__ = "app_users"

    telegram_id = Column(BigInteger, unique=True, nullable=False)
    username = Column(String, nullable=False)
    subscription = Column(String, nullable=True)
    end_at = Column(DateTime, default=datetime.utcnow())
    is_admin = Column(Boolean, default=False)