from fastapi import APIRouter, Depends
from pydantic import BaseModel

from backend.auth.schema.TokenSchema import TokenSchema
from backend.auth.service.auth import AuthService
from backend.auth.service.token import TokenService
from backend.core.database import get_db

auth = AuthService(get_db(), TokenService())

router = APIRouter()


class SignInSchema(BaseModel):
    user_id: int
    username: str


@router.post("/sign-in/", response_model=TokenSchema)
async def sign_in_async(schema: SignInSchema, service: AuthService = Depends()):
    return await service.sing_in_async(user_id=schema.user_id, username=schema.username)
