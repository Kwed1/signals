from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.database import get_db


class BaseService:
    def __init__(self, session: AsyncSession = Depends(get_db)):
        self.session = session
