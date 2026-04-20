from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from services.spotify import get_spotify_client, fetch_user_liked_songs, refresh_token, get_token_from_header
from services.ai import curate_playlist
from services.playlist_creator import create_playlist

router = APIRouter(prefix="/playlist", tags=["playlist"])

class PromptRequest(BaseModel):
    prompt: str

@router.post("/generate")
async def generate_playlist(request: Request, body: PromptRequest):
    token_info = get_token_from_header(request)
    if not token_info:
        raise HTTPException(status_code=401, detail="Unauthorized: No token found in session")
    
    # Refresh token if expired
    token_info = refresh_token(token_info)
    sp = get_spotify_client(token_info)
    liked_songs = await fetch_user_liked_songs(sp)
    result = await curate_playlist(body.prompt, liked_songs)
    
    track_ids = [liked_songs[t["index"]]["id"] for t in result["tracks"]]
    tracks = [
        {**liked_songs[t["index"]], "reason": t["reason"]} for t in result["tracks"]
    ]
    
    playlist_info = await create_playlist(
        sp=sp,
        playlist_name=result["playlist_name"],
        description=result["description"],
        track_ids=track_ids
    )
    
    return {
        "playlist_name": playlist_info["playlist_name"],
        "playlist_url": playlist_info["playlist_url"],
        "track_count": playlist_info["track_count"],
        "description": result["description"],
        "tracks": tracks
    }
    
@router.post("/test-gemini")
async def test_gemini(body: PromptRequest):
    fake_songs = [
        {"id": "1", "title": "Nightcall", "artist": "Kavinsky", "album": "Nightcall"},
        {"id": "2", "title": "Blinding Lights", "artist": "The Weeknd", "album": "After Hours"},
        {"id": "3", "title": "Midnight City", "artist": "M83", "album": "Hurry Up"},
        {"id": "4", "title": "Pink Moon", "artist": "Nick Drake", "album": "Pink Moon"},
        {"id": "5", "title": "Electric Feel", "artist": "MGMT", "album": "Oracular Spectacular"},
    ]
    result = await curate_playlist(body.prompt, fake_songs)
    return result