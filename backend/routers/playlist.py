from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from services.spotify import get_spotify_client, fetch_user_liked_songs, refresh_token
from services.ai import curate_playlist

router = APIRouter(prefix="/playlists", tags=["playlists"])

class PromptRequest(BaseModel):
    prompt: str
    
@router.post("/generate")
async def generate_playlist(request: Request, body: PromptRequest):
    token_info = request.session.get("token_info")
    if not token_info:
        raise HTTPException(status_code=401, detail="Unauthorized: No token found in session")
    
    # Refresh token if expired
    token_info = refresh_token(token_info)
    request.session["token_info"] = token_info
    
    sp = get_spotify_client(token_info)
    liked_songs = await fetch_user_liked_songs(sp)
    result = await curate_playlist(body.prompt, liked_songs)
    
    tracks = []
    for t in result["tracks"]:
        song = liked_songs[t["index"]]
        tracks.append({**song, "reason": t["reason"]}) 
        
    return {
        "playlist_name": result["playlist_name"],
        "description": result["description"],
        "tracks": tracks
    }