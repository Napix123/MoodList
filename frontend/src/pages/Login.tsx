const Login = () => {
    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/login`;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-5">
            <h1 className="text-5x1 font-bold text-white tracking-tight">MoodList</h1>
            <p className="text-zinc-400 text-lg">
                AI-curated Spotify playlists based on your current mood. <br />
            </p>
            <button
                onClick={handleLogin}
                className="mt-5 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-full transition-colors duration-250"
            >
                Login with Spotify
            </button>
        </div>
    );
};

export default Login;