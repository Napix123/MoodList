const Login = () => {
    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/login`;
    };

    return (
        <div className="min-h-screen bg-[#2a2a2a] flex flex-col justify-between items-center p-8 md:pt-14 overflow-hidden">
            <div className="flex justify-between items-center">
                <span className="text-[#666] text-sm">Moodlist</span>
                <span className="text-[#666] text-sm">made for Spotify</span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 flex-1 py-16">
                {/* Left side */}
                <div className="flex flex-col gap-8 max-w-xl">
                    <div className="animate-fade-up flex flex-col gap-1">
                        <span className="text-[#888] font-medium text-sm tracking-widest uppercase">Step 1</span>
                        <h1 className="font-display text-[70px] md:text-[96px] leading-[0.9] text-white">
                            Connect <br />your<br />Spotify
                        </h1>
                    </div>
                    <p className="animate-fade-up delay-1 text-[#888] text-lg">
                        <em>Generate</em> your personal playlist
                    </p>
                    <div className="animate-fade-up delay-2 flex flex-col gap-4 max-w-xs">
                        <button
                            onClick={handleLogin}
                            className="bg-white hover:bg-[#f0f0f0] text-black font-semibold py-4 px-8 rounded-full text-base transition-all duration-200"
                        >
                            Connect now
                        </button>
                        <p className="text-[#555] text-xs leading-relaxed">
                            We only access your liked songs to generate playlists. We never post without your permission.
                        </p>
                    </div>
                </div>

                {/* Right side */}
                <div className="animate-fade-up delay-3 flex-shrink-0 w-72 h-72 md:w-96 md:h-96 relative">
                    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <circle cx="200" cy="200" r="190" fill="#1a1a1a" />
                        {[160, 140, 120, 100, 80, 60, 40].map((r, i) => (
                            <circle key={i} cx="200" cy="200" r={r + 20} fill="none" stroke="#2e2e2e" strokeWidth="1" />
                        ))}
                        <circle cx="200" cy="200" r="60" fill="#c8b560" />
                        <circle cx="200" cy="200" r="55" fill="#c8b560" />
                        <text x="200" y="192" textAnchor="middle" fontSize="11" fill="#2a2a2a" fontFamily="DM Sans" fontWeight="500">MOODLIST</text>
                        <text x="200" y="208" textAnchor="middle" fontSize="9" fill="#2a2a2a" fontFamily="DM Sans">Side A</text>
                        <circle cx="200" cy="200" r="8" fill="#2a2a2a" />
                        <ellipse cx="150" cy="150" rx="30" ry="15" fill="white" opacity="0.04" transform="rotate(-30 150 130)" />
                    </svg>
                </div>
            </div>

            <div className="animate-fade-up delay-3 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#3a3a3a] pt-8">
                {["Connect with Spotify", "Describe your vibe", "AI curates songs", "Playlist in Spotify"].map((step, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <span className="text-[#555] text-xs">Step {i + 1}</span>
                        <span className="text-white text-sm font-medium">{step}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Login;