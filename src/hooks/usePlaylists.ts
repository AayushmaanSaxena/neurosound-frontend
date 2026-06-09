import { useState, useEffect, useCallback } from 'react'
import { playlistsApi } from '../services/api'
import type { Playlist } from '../types'

const usePlaylists = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPlaylists = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await playlistsApi.getAll()
            setPlaylists(response.data.playlists)
        } catch {
            setError('Failed to load playlists')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        let isMounted = true

        const load = async () => {
            setIsLoading(true)
            try {
                const response = await playlistsApi.getAll()
                if (isMounted) setPlaylists(response.data.playlists)
            } catch {
                if (isMounted) setError('Failed to load playlists')
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        load()

        return () => { isMounted = false }
    }, [])

    const createPlaylist = async (name: string) => {
        const formData = new FormData()
        formData.append('name', name)
        await playlistsApi.create(formData)
        await fetchPlaylists()
    }

    return { playlists, isLoading, error, createPlaylist, refetch: fetchPlaylists }
}

export default usePlaylists