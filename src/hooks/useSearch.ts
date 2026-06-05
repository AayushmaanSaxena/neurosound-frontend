import { useState, useEffect } from 'react'
import { searchApi } from '../services/api'
import type { Song, Artist, Album } from '../types'

interface SearchResults {
    songs: Song[]
    artists: Artist[]
    albums: Album[]
    totalResults: number
}

const emptyResults: SearchResults = {
    songs: [],
    artists: [],
    albums: [],
    totalResults: 0
}

const useSearch = (query: string) => {
    const [results, setResults] = useState<SearchResults>(emptyResults)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Don't search if query is too short
        // Return early without calling setState synchronously
        if (!query || query.trim().length < 2) {
            return
        }

        let isCancelled = false
        // isCancelled prevents state updates if the component
        // unmounts or the query changes before fetch completes

        const fetchResults = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await searchApi.search(query.trim())
                if (!isCancelled) {
                    setResults({
                        songs: response.data.songs || [],
                        artists: response.data.artists || [],
                        albums: response.data.albums || [],
                        totalResults: response.data.totalResults || 0
                    })
                }
            } catch {
                if (!isCancelled) {
                    setError('Search failed. Please try again.')
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false)
                }
            }
        }

        fetchResults()

        return () => {
            isCancelled = true
        }

    }, [query])

    // Reset results when query is cleared
    // Do this outside useEffect using derived logic
    const displayResults = query.trim().length < 2 ? emptyResults : results
    const displayLoading = query.trim().length >= 2 && isLoading

    return { results: displayResults, isLoading: displayLoading, error }
}

export default useSearch