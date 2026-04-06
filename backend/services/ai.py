import google.genai as genai
from google.genai import types
import json
from config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)

async def curate_playlist(prompt: str, songs: list):
    songs_list = "\n".join(f"{i}: {s['title']} by {s['artist']}" for i, s in enumerate(songs))
    gemini_prompt = f"""
    You are a music curator, creating a playlist for the user. Given a user's vibe description and their liked songs,
    select 20-30 songs that best match the vibe. Return ONLY valid JSON, no markdown, no explanations, no code blocks.
    
    Format:
    {{
        "playlist_name": "short evocative name for the playlist",
        "description": "1-2 sentences describing the vibe of the playlist",
        "tracks": [
            {{"index": 0, "reason": "max 10 words why this fits}}
        ]
    }}
    
    User's vibe description: "{prompt}"
    
    Liked songs:
    {songs_list}
    """
    
    response = client.models.generate_content(model="gemini-2.0-flash", contents=gemini_prompt)
    print("Gemini response:", response)
    print("Gemini text:", response.text)
    text = response.text.strip()
    text = text.replace("```json", "").replace("```", "").strip()
    return json.loads(text)