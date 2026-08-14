from fastapi import FastAPI
from routes.labmem import labmem

api = FastAPI()
api.include_router(labmem)
