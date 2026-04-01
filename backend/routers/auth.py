from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from services.spotify import create_spotify_oauth
from config import FRONTEND_URL

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/login")
def login():
    spotify_oauth = create_spotify_oauth()
    auth_url = spotify_oauth.get_authorize_url()
    return RedirectResponse(auth_url)

@router.get("/callback")
def callback(code: str):
    spotify_oauth = create_spotify_oauth()
    token_info = spotify_oauth.get_access_token(code)
    # Remembering to store the token in the session later
    return {"token": token_info}