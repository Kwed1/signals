from fastapi import APIRouter, Depends
from pydantic import BaseModel

from backend.schemas.user import UserSchema
from backend.service.user_service import UserService

router = APIRouter()

# Pydantic-схема для запросов
class UserAction(BaseModel):
    user_id: int

@router.get("/", response_model=list[UserSchema])
async def get_all_users(service: UserService = Depends()):
    return await service.get_all_users()

@router.post("/join", include_in_schema=False)
async def join_to_group(action: UserAction, service: UserService = Depends()):
    return await service.user_subscribe(user_id=action.user_id)


@router.post("/left", include_in_schema=False)
async def leave_group(action: UserAction, service: UserService = Depends()):
    return await service.user_unsubscribe(user_id=action.user_id)
