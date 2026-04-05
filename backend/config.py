from dotenv import load_dotenv
import os

load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI", "http://127.0.0.1:8000/auth/callback")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
SESSION_SECRET_KEY = os.getenv("SESSION_SECRET_KEY")

SPOTIFY_SCOPES = "user-library-read playlist-modify-public playlist-modify-private"

def validate_config():
    missing = [v for v in ["SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET", "GEMINI_API_KEY", "SESSION_SECRET_KEY"] if not os.getenv(v)]
    if missing:
        raise EnvironmentError(f"Missing required environment variables: {', '.join(missing)}")