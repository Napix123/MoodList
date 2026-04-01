import spotipy
from spotipy.oauth2 import SpotifyOAuth
from config import (SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, SPOTIPY_REDIRECT_URI, SPOTIFY_SCOPES)

def create_spotify_oauth():
    return SpotifyOAuth(
        client_id=SPOTIPY_CLIENT_ID,
        client_secret=SPOTIPY_CLIENT_SECRET,
        redirect_uri=SPOTIPY_REDIRECT_URI,
        scope=SPOTIFY_SCOPES
    )
    
def get_spotify_client(token_info: dict):
    return spotipy.Spotify(auth=token_info["access_token"]) 