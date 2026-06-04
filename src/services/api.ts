import axios from 'axios';

// Base URL of your backend
// All requests will start with this
const BASE_URL = 'http://localhost:3000/api';

// Create an axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Sends cookies automatically (for refresh token)
});

// ─────────────────────────────────────────
// REQUEST INTERCEPTOR
// Runs before every request is sent
// Automatically adds the access token to every request
// So you don't have to manually add it every time
// ─────────────────────────────────────────
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─────────────────────────────────────────
// RESPONSE INTERCEPTOR
// Runs after every response comes back
// If we get a 401 (token expired) → automatically refresh the token
// Then retry the original request
// This is how apps keep you logged in without asking for password
// ─────────────────────────────────────────
api.interceptors.response.use(
    (response) => response, // if successful, just return the response
    async (error) => {
        const originalRequest = error.config;


        // Skip refresh logic for auth endpoints
        // Login/register failures should just throw the error
        const isAuthRoute = originalRequest.url?.includes('/auth/')

        // If 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
            originalRequest._retry = true;

            try {
                // Try to get a new access token
                const response = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = response.data.accessToken;
                localStorage.setItem('accessToken', newToken);

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // Refresh failed — user needs to log in again
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }

);

// ─────────────────────────────────────────
// SONGS API
// ─────────────────────────────────────────
export const songsApi = {
    getAll: (page = 1, limit = 20) =>
        api.get(`/songs?page=${page}&limit=${limit}`),

    getById: (id: number) =>
        api.get(`/songs/${id}`),

    create: (formData: FormData) =>
        api.post('/songs', formData),

    update: (id: number, data: Partial<{ title: string; artist_id: number; album_id: number; duration: number }>) =>
        api.put(`/songs/${id}`, data),

    delete: (id: number) =>
        api.delete(`/songs/${id}`),
}

// ─────────────────────────────────────────
// ARTISTS API
// ─────────────────────────────────────────
export const artistsApi = {
    getAll: () => api.get('/artists'),
    getById: (id: number) => api.get(`/artists/${id}`),
}

// ─────────────────────────────────────────
// ALBUMS API
// ─────────────────────────────────────────
export const albumsApi = {
    getAll: () => api.get('/albums'),
    getById: (id: number) => api.get(`/albums/${id}`),
}

// ─────────────────────────────────────────
// SEARCH API
// ─────────────────────────────────────────
export const searchApi = {
    search: (q: string) => api.get(`/search?q=${q}`),
    searchSongs: (q: string) => api.get(`/search/songs?q=${q}`),
    searchArtists: (q: string) => api.get(`/search/artists?q=${q}`),
}

// ─────────────────────────────────────────
// LIKED SONGS API
// ─────────────────────────────────────────
export const likedSongsApi = {
    getAll: () => api.get('/liked-songs'),
    toggle: (songId: number) => api.post(`/liked-songs/${songId}/toggle`),
    check: (songId: number) => api.get(`/liked-songs/${songId}/check`),
}

// ─────────────────────────────────────────
// PLAYLISTS API
// ─────────────────────────────────────────
export const playlistsApi = {
    getAll: () => api.get('/playlists'),
    getById: (id: number) => api.get(`/playlists/${id}`),
    create: (formData: FormData) => api.post('/playlists', formData),
    addSong: (playlistId: number, songId: number) =>
        api.post(`/playlists/${playlistId}/songs`, { song_id: songId }),
    removeSong: (playlistId: number, songId: number) =>
        api.delete(`/playlists/${playlistId}/songs/${songId}`),
}

export default api;