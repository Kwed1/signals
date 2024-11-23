from fastapi import APIRouter, Depends

from backend.service.user_service import UserService


router = APIRouter()


@router.get('/')
async def get_all_users(service: UserService = Depends()):
    return await service.get_all_users()