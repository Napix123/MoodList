from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import validate_config, FRONTEND_URL

validate_config()

app = FastAPI(title="MoodList API", version="1.0")

