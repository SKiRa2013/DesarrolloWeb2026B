import os
from sqlalchemy import create_engine, MetaData, text

DATABASE_URL = f"postgresql+psycopg://{os.getenv("DATABASE_USER", "postgres")}:{os.getenv("DATABASE_PASSWORD", "postgres1")}@{os.getenv("DATABASE_HOST", "localhost")}:{os.getenv("DATABASE_PORT", "5432")}/{os.getenv("DATABASE_NAME", "db")}"

meta = MetaData()

engine = create_engine(DATABASE_URL, echo=True)
conn = engine.connect()