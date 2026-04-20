from httpx import AsyncClient, ASGITransport
from main import app
import pytest

@pytest.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c
        
async def test_health(client):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
    
async def test_login_redirects(client):
    response = await client.get("/auth/login", follow_redirects=False)
    assert response.status_code == 307
    assert "accounts.spotify.com" in response.headers["location"]
    
async def test_callback_without_code(client):
    response = await client.get("/auth/callback")
    assert response.status_code == 422 # missing required parameter
    
async def test_logout(client):
    response = await client.get("/auth/logout", follow_redirects=False)
    assert response.status_code == 307