from httpx import AsyncClient, ASGITransport
from main import app
import pytest

@pytest.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c
        
async def test_generate_unaunthenticated(client):
    response = await client.post("/playlist/generate", json={"prompt": "chill vibes"})
    assert response.status_code == 401
    assert response.json()["detail"] == "Unauthorized: No token found in session"
    
async def test_generate_missing_prompt(client):
    response = await client.post("/playlist/generate", json={})
    assert response.status_code == 422