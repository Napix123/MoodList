from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import validate_config, FRONTEND_URL
import os
from dotenv import load_dotenv

load_dotenv()
print("SPOTIFY_CLIENT_ID:", os.getenv("SPOTIFY_CLIENT_ID"))
print("GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY"))