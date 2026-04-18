import { useState } from "react";

interface Props {
    onGenerate: (prompt: string) => void;
    loading: boolean;
}

const PromptBar = ({ onGenerate, loading }: Props) => {
    const [prompt, setPrompt] = useState("");

    const handleSubmit = () => {
        if (prompt.trim()) onGenerate(prompt.trim());
    };

    return (
        <div className="flex flex-col gap-5 w-full max-w-lg">
            <textarea
                className="w-full bg-zinc-800 text-white border border-zinc-600 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-green-500 transition-colors"
                rows={3}
                placeholder="e.g. late night drive through the city..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-full transition-colors duration-250"
                disabled={loading || !prompt.trim()}
            >
                {loading ? "Curating..." : "Curate Playlist"}
            </button>
        </div>
    );
};

export default PromptBar;