from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from services.spotify import create_spotify_oauth
from config import SPOTIFY_REDIRECT_URI, FRONTEND_URL

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/login")
def login():
    spotify_oauth = create_spotify_oauth()
    auth_url = spotify_oauth.get_authorize_url()
    print("REDIRECT URI FROM CONFIG:", SPOTIFY_REDIRECT_URI)
    print("AUTH URL:", auth_url)  # ← add this
    return RedirectResponse(auth_url)

@router.get("/callback")
def callback(request: Request, code: str):
    spotify_oauth = create_spotify_oauth()
    token_info = spotify_oauth.get_access_token(code)
    request.session["token_info"] = token_info
    return RedirectResponse(f"{FRONTEND_URL}/library")

@router.get("/logout")
def logout(request: Request):
    request.session.clear()
    return RedirectResponse(f"{FRONTEND_URL}/")