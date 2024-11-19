FROM python:3.12

WORKDIR /app

COPY . /app/

# Устанавливаем зависимости
RUN python -m pip install --upgrade pip \
    && pip install --no-cache-dir -r /app/backend/requirements.txt

# Открываем порт 8000
EXPOSE 8003

# Запускаем Uvicorn с указанием правильного пути
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8003"]
