from datetime import datetime
import uuid

from sqlalchemy import Column, DateTime, UUID
from sqlalchemy.orm import DeclarativeBase, declared_attr


class BaseEntity(DeclarativeBase):
    __abstract__ = True
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    create_at = Column(DateTime, default=datetime.utcnow())

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()
