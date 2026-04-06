from fastapi import APIRouter, Request, HTTPException
from services.spotify import get_spotify_client, fetch_user_liked_songs, refresh_token

router = APIRouter(prefix="/songs", tags=["songs"])

@router.get("/liked")
async def get_liked_songs(request: Request):
    token_info = request.session.get("token_info")
    if not token_info:
        raise HTTPException(status_code=401, detail="Unauthorized: No token found in session")
    
    token_info = refresh_token(token_info)
    request.session["token_info"] = token_info
    
    sp = get_spotify_client(token_info)
    liked_songs = await fetch_user_liked_songs(sp)
    return {"total": len(liked_songs), "liked_songs": liked_songs}