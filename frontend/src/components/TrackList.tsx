import type { Track } from "../types";

interface Props {
    tracks: Track[];
}

const TrackList = ({ tracks }: Props) => {
    return (
        <div className="w-full max-w-xl flex flex-col gap-2">
            {tracks.map((track, index) => (
                <div
                    key={track.id}
                    className="flex items-start gap-4 bg-zinc-800 rounded-xl px-4 py-3 border border"
                >
                    <span className="text-zinc-600 text-sm w-5 pt-0.5 flex-shrink-0">
                        {index +  1}
                    </span>
                    <div className="flex flex-col min-w-0">
                        <span className="text-white font-medium text-sm truncate">
                            {track.title}
                        </span>
                        <span className="text-zinc-400 text-xs">{track.artist}</span>
                        <span className="text-zinc-600 text-xs italic mt-1">
                            {track.reason}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};