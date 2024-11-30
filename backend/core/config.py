from fastapi.security import OAuth2PasswordBearer

DATABASE_URL = "postgresql+asyncpg://postgres@95.169.201.222:5433/postgres"
SECRET_KEY = "key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

BOT_TOKEN='7903718787:AAGqSHB6Pm8NwINiHaZdabugQsgQntv2RRw'
TELEGRAM_API_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"
