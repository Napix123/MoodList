import pytest
from unittest.mock import patch, MagicMock
from services.ai import curate_playlist

async def test_curate_playlist_returns_expected_keys():
    fake_songs = [
        {"id": "1", "title": "Nightcall", "artist": "Kavinsky", "album": "Nightcall"},
        {"id": "2", "title": "Blinding Lights", "artist": "The Weeknd", "album": "After Hours"},
        {"id": "3", "title": "Midnight City", "artist": "M83", "album": "Hurry Up"},
    ]
    
    mock_response = MagicMock()
    mock_response.text = '''
    {
        "playlist_name": "Night Drive",
        "description": "A moody late night playlist.",
        "tracks": [
            {"index": 0, "reason": "dark synth feel"},
            {"index": 1, "reason": "driving beat"}
        ]
    }
    '''
    
    with patch("services.ai.client") as mock_client:
        mock_client.models.generate_content.return_value = mock_response
        result = await curate_playlist("late night drive", fake_songs)
        
    assert "playlist_name" in result
    assert "description" in result
    assert "tracks" in result
    assert len(result["tracks"]) == 2
    assert result["tracks"][0]["index"] == 0
    
async def test_curate_playlist_track_indices():
    fake_songs = [
        {"id": "1", "title": "Song A", "artist": "Artist A", "album": "Album A"},
        {"id": "2", "title": "Song B", "artist": "Artist B", "album": "Album B"},
    ]
    
    mock_response = MagicMock()
    mock_response.text = '''
    {
        "playlist_name": "Test",
        "description": "Test playlist",
        "tracks": [{"index": 1, "reason": "good fit"}]
    }
    '''
    
    with patch("services.ai.client") as mock_client:
        mock_client.models.generate_content.return_value = mock_response
        result = await curate_playlist("test vibe", fake_songs)
        
    assert result["tracks"][0]["index"] == 1
    