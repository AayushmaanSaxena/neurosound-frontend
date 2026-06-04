import { useState, useEffect } from 'react'
import { songsApi } from '../services/api'
import type { Song } from '../types'

// ─────────────────────────────────────────
// useSongs hook
// Fetches all songs from the API
// Returns songs, loading state and error
// ─────────────────────────────────────────
export const useSongs = (page = 1, limit = 20) => {
    const [songs, setSongs] = useState<Song[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchSongs = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await songsApi.getAll(page, limit)
                setSongs(response.data.songs)
                setTotalPages(response.data.totalPages)
            } catch {
                setError('Failed to load songs')
            } finally {
                setIsLoading(false)
            }
        }

        fetchSongs()
    }, [page, limit])

    return { songs, isLoading, error, totalPages }
}