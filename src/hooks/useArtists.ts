import { useState, useEffect } from 'react'
import { artistsApi } from '../services/api'
import type { Artist } from '../types'

export const useArtists = () => {
    const [artists, setArtists] = useState<Artist[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArtists = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await artistsApi.getAll()
                setArtists(response.data.artists)
            } catch {
                setError('Failed to load artists')
            } finally {
                setIsLoading(false)
            }
        }

        fetchArtists()
    }, [])

    return { artists, isLoading, error }
}