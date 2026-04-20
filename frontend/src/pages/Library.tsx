import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generatePlaylist } from "../api/client";
import type { Playlist } from "../types";
import PromptBar from "../components/PromptBar";

const Vibes = [
    {label: 'late night drive', color: '#821982'},
    { label: 'rainy day', color: '#2e1b6b'},
    {label: 'workout', color: '#3b7227'},
    {label: 'deep focust', color: '#1a2030'},
    {label: 'sad', color: '#3e1616'},
]

const Library = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bg, setBg] = useState("#2a2a2a"); // Default background color
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
    <div
      className="min-h-screen flex flex-col justify-between p-8 md:p-14 transition-colors duration-700"
      style={{ backgroundColor: bg }}
    >
      {/* Top bar */}
      <div className="flex justify-between items-center">
        <span className="text-[#666] text-sm">moodlist</span>
        <span className="text-[#666] text-sm">Step 2</span>
      </div>

      {/* Main */}
      <div className="flex flex-col gap-10 flex-1 justify-center max-w-2xl">
        <div className="flex flex-col gap-2">
          <span className="text-[#888] text-sm font-medium tracking-widest uppercase">Step 2</span>
          <h1 className="font-display text-[64px] md:text-[88px] leading-[0.9] text-white">
            What's<br />your vibe?
          </h1>
          <p className="text-[#888] text-lg mt-2">
            <em>generate</em> your ultimate personal playlist
          </p>
        </div>

        {/* Input */}
        <div className="max-w-lg">
            <PromptBar onGenerate={handleGenerate} loading={loading} />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </div>

      {/* Vibe pills — hover changes background color */}
      <div className="flex flex-col gap-4 border-t border-[#ffffff15] pt-8">
        <span className="text-[#555] text-xs uppercase tracking-widest">or pick a vibe</span>
        <div className="flex flex-wrap gap-2">
          {Vibes.map((v) => (
            <button
              key={v.label}
              onMouseEnter={() => setBg(v.color)}
              onMouseLeave={() => setBg("#2a2a2a")}
              onClick={() => handleGenerate(v.label)}
              disabled={loading}
              className="border border-[#ffffff20] hover:border-white text-[#aaa] hover:text-white text-sm px-4 py-2 rounded-full transition-all duration-200"
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Library;