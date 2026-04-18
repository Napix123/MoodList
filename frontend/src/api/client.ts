import axios from 'axios';
import type { Playlist, Track, User } from '../types';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    withCredentials: true,
})

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token_info');
    if (token) {
        config.headers['X-Token'] = token;
    }
    return config;
});

export const generatePlaylist = async (prompt: string): Promise<Playlist> => {
    const response = await client.post('/playlist/generate', { prompt });
    return response.data;
}

export const getLikedSongs = async (): Promise<Track[]> => {
    const response = await client.get('/songs/liked');
    return response.data;
}

export const getCurrentUser = async (): Promise<User> => {
    const response = await client.get('/auth/me');
    return response.data;
}

export default client;