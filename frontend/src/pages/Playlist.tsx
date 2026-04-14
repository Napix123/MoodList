import { useLocation, useNavigate } from "react-router-dom";
import type { Playlist } from "../types";
import TrackList from "../components/TrackList";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const playlist = location.state?.playlist as Playlist | undefined;

    if (!playlist) {
        navigate("/library");
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white pt-4 py-12 flex flex-col items-center gap-8">
            <div className="text-center max-w-xl">
                <h1 className="text-4x1 font-bold tracking-tight">
                    {playlist.playlist_name}
                </h1>
                <p className="text-zinc-400 mt-3">{playlist.description}</p>

                <a
                    href={playlist.playlist_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-5 bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2 rounded-full transition-colors duration-250"
                >
                    Open in Spotify
                </a>
            </div>
            <TrackList tracks={playlist.tracks} />
            <button
                onClick={() => navigate("/library")}
                className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
            >
                Curate another playlist
            </button>
        </div>
    );
};

export default Result;