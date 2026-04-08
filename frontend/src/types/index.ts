export interface User {
    id: string;
    display_name: string;
    email: string;
    images: { url: string }[];
}

export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    reason: string;
}

export interface Playlist {
    playlist_name: string;
    playlist_url: string;
    track_count: number;
    description: string;
    tracks: Track[];
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
}