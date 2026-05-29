// These interfaces define the shape of your data
// TypeScript uses these to catch errors before runtime

export interface User {
    id: number;
    name: string;
    email: string;
    profile_image: string | null;
    created_at: string;
}

export interface Artist {
    id: number;
    name: string;
    bio: string | null;
    image: string | null;
    song_count?: number;
    album_count?: number;
}

export interface Album {
    id: number;
    title: string;
    artist_id: number;
    artist_name?: string;
    cover_image: string | null;
    release_year: number | null;
    song_count?: number;
}

export interface Song {
    id: number;
    title: string;
    audio_url: string;
    cover_image: string | null;
    duration: number | null;
    artist_id: number;
    artist_name?: string;
    album_id: number | null;
    album_title?: string;
    liked_at?: string;
}

export interface Playlist {
    id: number;
    name: string;
    user_id: number;
    cover_image: string | null;
    song_count?: number;
    created_at: string;
}

export interface AuthResponse {
    message: string;
    accessToken: string;
    user: User;
}

export interface PaginatedSongs {
    page: number;
    limit: number;
    totalSongs: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    songs: Song[];
}