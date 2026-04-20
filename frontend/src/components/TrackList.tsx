import type { Track } from "../types";

interface Props { tracks: Track[]; }

const TrackList = ({ tracks }: Props) => (
  <div className="flex flex-col">
    {tracks.map((track, index) => (
      <div
        key={track.id}
        className="flex items-center gap-5 py-4 border-b border-[#333] hover:bg-[#ffffff05] px-2 transition-colors group"
      >
        <span className="text-[#444] text-sm w-5 text-right font-mono flex-shrink-0">{index + 1}</span>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-white font-medium truncate">{track.title}</span>
          <span className="text-[#666] text-sm">{track.artist}</span>
        </div>
        {track.reason && (
          <span className="text-[#444] group-hover:text-[#666] text-xs italic text-right max-w-[180px] hidden md:block transition-colors flex-shrink-0">
            {track.reason}
          </span>
        )}
      </div>
    ))}
  </div>
);

export default TrackList;