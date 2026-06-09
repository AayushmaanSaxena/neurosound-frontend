import { useState, useEffect, useCallback } from 'react'
import { likedSongsApi } from '../services/api'
import type { Song } from '../types'

const useLikedSongs = () => {
    const [songs, setSongs] = useState<Song[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchLikedSongs = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await likedSongsApi.getAll()
            setSongs(response.data.songs)
        } catch {
            setError('Failed to load liked songs')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        let isMounted = true

        const load = async () => {
            setIsLoading(true)
            try {
                const response = await likedSongsApi.getAll()
                if (isMounted) setSongs(response.data.songs)
            } catch {
                if (isMounted) setError('Failed to load liked songs')
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        load()

        return () => { isMounted = false }
    }, [])

    const toggleLike = async (songId: number) => {
        try {
            const response = await likedSongsApi.toggle(songId)
            await fetchLikedSongs()
            return response.data.isLiked as boolean
        } catch {
            return false
        }
    }

    return { songs, isLoading, error, toggleLike, refetch: fetchLikedSongs }
}

export default useLikedSongs