from fastapi import HTTPException, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from backend.auth.service.auth import UserUnauthorizedException, AuthService
from backend.auth.service.token import TokenService
from backend.core.config import oauth2_scheme
from backend.core.database import get_db


class AuthenticationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        excluded_prefixes = [
            "/auth",
            "/docs",
            "/openapi.json",
            "/friends/add",
            "/files",
        ]
        if request.url.path != "/" and not any(
            request.url.path.startswith(prefix) for prefix in excluded_prefixes
        ):
            try:
                async for db in get_db():
                    token = await oauth2_scheme(request)

                    if token is None:
                        raise UserUnauthorizedException()
                    identity_service = AuthService(db, TokenService())
                    user_id = await identity_service.authorized_user(token)
                    request.state.login_id = user_id
            except HTTPException as exc:
                return JSONResponse(
                    content={"detail": exc.detail},
                    status_code=exc.status_code,
                )

        response = await call_next(request)

        return response
