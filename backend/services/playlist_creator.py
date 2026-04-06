import spotipy

async def create_playlist(sp: spotipy.Spotify, playlist_name: str, description: str, track_ids: list[str]):
    # Gets current user's ID
    user = sp.current_user()
    if not user:
        raise ValueError("Could not fetch the Spotify user. Please check your authentication.")
    user_id = user["id"]
    
    # Creates an empty playlist
    playlist = sp.user_playlist_create(
        user=user_id,
        name=playlist_name,
        public=True,
        description=description
    )
    playlist_id = playlist["id"]
    playlist_url = playlist["external_urls"]["spotify"]
    
    # Spotify API expects tracks URIs in this format "spotify:track:<track_id>"
    track_uris = [f"spotify:track:{track_id}" for track_id in track_ids]
    
    # Spotify only allows max 100 tracks per request
    for i in range(0, len(track_uris), 100):
        batch = track_uris[i:i+100]
        sp.playlist_add_items(playlist_id, batch)
        
    return {
        "playlist_id": playlist_id,
        "playlist_url": playlist_url,
        "playlist_name": playlist_name,
        "track_count": len(track_ids)
    }