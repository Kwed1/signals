from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.core.database import init_db
from backend.routes import auth, channel, message, user

app = FastAPI()


@app.on_event("startup")
async def startup():
    await init_db()
    add_swagger()


def add_swagger():
    openapi_schema = app.openapi()
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {"type": "http", "scheme": "bearer", "bearerFormat": "JWT"}
    }
    openapi_schema["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema


app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(channel.router, prefix="/channel", tags=["channel"])
app.include_router(message.router, prefix="/message", tags=["message"])
app.include_router(user.router, prefix="/user", tags=["user"])

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
