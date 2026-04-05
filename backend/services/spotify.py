import spotipy
from spotipy.oauth2 import SpotifyOAuth
from config import (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES)


def create_spotify_oauth():
    return SpotifyOAuth(
        client_id=SPOTIFY_CLIENT_ID,
        client_secret=SPOTIFY_CLIENT_SECRET,
        redirect_uri=SPOTIFY_REDIRECT_URI,
        scope=SPOTIFY_SCOPES
    )
    
def get_spotify_client(token_info: dict):
    return spotipy.Spotify(auth=token_info['access_token'])

def fetch_user_liked_songs(sp: spotipy.Spotify):
    liked_songs = []
    request_limit = 50
    offset = 0
    
    while True:
        results = sp.current_user_saved_tracks(limit=request_limit, offset=offset)
        items = results.get("items", [])
        
        for item in items:
            track = item["track"]
            liked_songs.append({
                "id": track["id"],
                "title": track["name"],
                "artist": ", ".join(a["name"] for a in track["artists"]),
                "album": track["album"]["name"],
            })
            
        # If we got fewer than the request limit, we know we've reached the end
        if len(items) < request_limit:
            break
        
        offset += request_limit
        
    return liked_songs