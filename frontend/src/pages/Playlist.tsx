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
        <div className="min-h-screen bg-[#2a2a2a] flex flex-col justify-between p-8 md:p-14">
            {/* Top screen */}
            <div className="flex justify-between items-center">
                <span className="text-[#666] text-sm">Moodlist</span>
                <button
                    onClick={() => navigate("/library")}
                    className="text-[#666] text-sm hover:text-white transition-colors"
                >
                    ← New Playlist
                </button>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-13">
                <div className="flex flex-col gap-3">
                    <span className="text-[#666] text-sm font-medium tracking-widest uppercase">Your playlist is ready</span>
                    <h1 className="font-display text-[60px] md:text-[80px] text-white leading-[0.9] max-w-2xl">
                        {playlist.playlist_name}
                    </h1> 
                    <p className="text-[#888] text-base max-w-lg mt-2 leading-relaxed">
                        {playlist.description}
                    </p>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                    <a
                        href={playlist.playlist_url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white hover:bg-[#f0f0f0] text-black font-semibold py-4 px-8 rounded-full text-sm transition-colors duration-200 text-center"
                    >
                        Open in Spotify
                    </a>
                    <span className="text-[#555] text-xs text-center">{playlist.track_count} tracks</span>
                </div>
            </div>

            {/* Track list */}
            <div className="border border-[#3a3a3a]">
                <TrackList tracks={playlist.tracks} />
            </div>
        </div>
    );
};

export default Result;