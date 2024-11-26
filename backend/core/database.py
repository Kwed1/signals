from datetime import timezone, datetime, timedelta
import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from backend.auth.models.app_user import AppUser
from backend.core.config import DATABASE_URL
from backend.entities.base_entity import BaseEntity

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(bind=engine)


def to_utc(dt):
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(BaseEntity.metadata.create_all)

    async with AsyncSessionLocal() as session:
        async with session.begin():
            check_tables = (await session.execute(select(AppUser))).scalars().all()
            if check_tables:
                return

            admin = AppUser(
                telegram_id=1,
                username="admin",
                is_admin=True,
                subscription="admin",
            )
            session.add(admin)
            await session.commit()
        pass


async def get_db():
    async with engine.begin() as conn:
        await conn.run_sync(BaseEntity.metadata.create_all)

    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close()
