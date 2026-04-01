from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from config import FRONTEND_URL, validate_config
from routers import auth
import os

SESSION_SECRET_KEY = os.getenv("SESSION_SECRET_KEY")

# Validate the configuration at startup
validate_config()

app = FastAPI(title="Moodlist API", version="1.0")

app.add_middleware(SessionMiddleware, secret_key=f"`{SESSION_SECRET_KEY}`")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)