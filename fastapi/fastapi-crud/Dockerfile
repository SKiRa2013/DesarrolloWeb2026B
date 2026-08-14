# 1. Imagen base oficial de Python (ligera)
FROM python:3.12-slim

# 2. Prevenir que Python escriba archivos .pyc y forzar logs inmediatos
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 4. Instalar dependencias del sistema (necesarias para interactuar con Postgres)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 5. Copiar e instalar las dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copiar el código fuente de la API
COPY . .

# 7. Exponer el puerto de FastAPI
EXPOSE 8000

# 8. Comando para iniciar la aplicación con Uvicorn
CMD ["uvicorn", "app:api", "--host", "0.0.0.0", "--port", "8000"]