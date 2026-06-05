import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import useSearch from '../hooks/useSearch'
import SongCard from '../components/ui/SongCard'
import ArtistCard from '../components/ui/ArtistCard'
import AlbumCard from '../components/ui/AlbumCard'
import SectionHeader from '../components/ui/SectionHeader'
import type { Song, Artist, Album } from '../types'

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    // Debounce the search term — only search 400ms after user stops typing
    const debouncedSearch = useDebounce(searchTerm, 400)

    // useSearch fires when debouncedSearch changes
    const { results, isLoading, error } = useSearch(debouncedSearch)

    const hasResults = results.totalResults > 0
    const hasSearched = debouncedSearch.length >= 2

    const handleSongPlay = (song: Song) => {
        console.log('Playing:', song.title)
        // Will connect to player in Week 5
    }

    const handleArtistClick = (artist: Artist) => {
        navigate(`/artist/${artist.id}`)
    }

    const handleAlbumClick = (album: Album) => {
        navigate(`/album/${album.id}`)
    }

    return (
        <div className="px-6 py-4 pb-8">

            {/* Search Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-ns-white mb-4">Search</h1>

                {/* Search Input */}
                <div className="relative max-w-xl">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ns-gray text-lg">
                        🔍
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="What do you want to listen to?"
                        className="w-full bg-ns-white text-ns-black placeholder-ns-light-gray rounded-full py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ns-white"
                        autoFocus
                    />
                    {/* Clear button */}
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-ns-light-gray hover:text-ns-black text-lg"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="flex items-center gap-2 text-ns-gray py-8">
                    <div className="w-4 h-4 border-2 border-ns-green border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Searching...</span>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="text-red-400 text-sm py-4">{error}</div>
            )}

            {/* Empty state — before user types */}
            {!hasSearched && !isLoading && (
                <div className="py-8">
                    <p className="text-ns-gray text-sm">
                        Start typing to search for songs, artists and albums
                    </p>
                </div>
            )}

            {/* No results */}
            {hasSearched && !isLoading && !hasResults && !error && (
                <div className="py-8 text-center">
                    <p className="text-ns-white text-lg font-medium">
                        No results for "{debouncedSearch}"
                    </p>
                    <p className="text-ns-gray text-sm mt-2">
                        Try searching for something else
                    </p>
                </div>
            )}

            {/* Results */}
            {hasResults && !isLoading && (
                <div className="flex flex-col gap-10">

                    {/* Songs results */}
                    {results.songs.length > 0 && (
                        <section>
                            <SectionHeader
                                title="Songs"
                                showAll={results.songs.length >= 10}
                                onShowAll={() => navigate(`/search/songs?q=${debouncedSearch}`)}
                            />
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {results.songs.map(song => (
                                    <SongCard
                                        key={song.id}
                                        song={song}
                                        onPlay={handleSongPlay}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Artists results */}
                    {results.artists.length > 0 && (
                        <section>
                            <SectionHeader title="Artists" />
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {results.artists.map(artist => (
                                    <ArtistCard
                                        key={artist.id}
                                        artist={artist}
                                        onClick={handleArtistClick}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Albums results */}
                    {results.albums.length > 0 && (
                        <section>
                            <SectionHeader title="Albums" />
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {results.albums.map(album => (
                                    <AlbumCard
                                        key={album.id}
                                        album={album}
                                        onClick={handleAlbumClick}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Total results count */}
                    <p className="text-ns-gray text-xs">
                        {results.totalResults} result{results.totalResults !== 1 ? 's' : ''} for "{debouncedSearch}"
                    </p>

                </div>
            )}

        </div>
    )
}

export default SearchPage