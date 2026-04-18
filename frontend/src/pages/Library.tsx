import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generatePlaylist } from "../api/client";
import type { Playlist } from "../types";
import PromptBar from "../components/PromptBar";

const Library = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("token_info", token);
            // Clean up the URL by removing the token query parameter
            navigate("/library", { replace: true });
        }
    },[]);

    const handleGenerate = async (prompt: string) => {
        setLoading(true);
        setError(null);
        try {
            const playlist: Playlist = await generatePlaylist(prompt);
            navigate("/result", { state: { playlist } });
        } catch (err) {
            setError("Failed to generate playlist. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 px-4">
            <h1 className="text-4x1 font-bold text-white tracking-tight">
                What's the vibe?
            </h1>
            <p className="text-zinc-400 text-center max-w-md">
                Describe a mood, moment, or feeling and we'll create a playlist just for you.
            </p>
            <PromptBar onGenerate={handleGenerate} loading={loading} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default Library;