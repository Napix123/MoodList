from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, songs
from config import FRONTEND_URL, validate_config

# Validate the configuration at startup
validate_config()

app = FastAPI(title="Moodlist API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(auth.router)
app.include_router(songs.router)
