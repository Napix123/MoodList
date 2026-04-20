from httpx import AsyncClient, ASGITransport
from main import app
import pytest

@pytest.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c
        
async def test_liked_songs_unauthenticated(client):
    response = await client.get("/songs/liked")
    assert response.status_code == 401
    assert response.json()["detail"] == "Unauthorized: No token found in session"
    
