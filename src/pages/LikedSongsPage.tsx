import { useNavigate } from 'react-router-dom'
import useLikedSongs from '../hooks/useLikedSongs'
import SongCard from '../components/ui/SongCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import type { Song } from '../types'

const LikedSongsPage = () => {
    const { songs, isLoading, toggleLike } = useLikedSongs()
    const navigate = useNavigate()

    const handlePlay = (song: Song) => {
        console.log('Playing:', song.title)
        // Connect to player in Week 5
    }

    const handleUnlike = async (song: Song) => {
        await toggleLike(song.id)
    }

    return (
        <div className="pb-8">

            {/* Hero header — gradient like Spotify */}
            <div className="bg-gradient-to-b from-purple-700 to-ns-dark px-6 pt-8 pb-6">
                <div className="flex items-end gap-6">
                    <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-blue-700 rounded-md flex items-center justify-center shadow-xl flex-shrink-0">
                        <span className="text-7xl">💜</span>
                    </div>
                    <div>
                        <p className="text-ns-white text-xs font-medium uppercase tracking-widest mb-2">
                            Playlist
                        </p>
                        <h1 className="text-5xl font-black text-ns-white mb-4">
                            Liked Songs
                        </h1>
                        <p className="text-ns-gray text-sm">
                            {songs.length} song{songs.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            </div>

            {/* Songs list */}
            <div className="px-6 pt-6">
                {isLoading ? (
                    <LoadingSkeleton count={6} />
                ) : songs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-ns-white text-xl font-medium">
                            Songs you like will appear here
                        </p>
                        <p className="text-ns-gray text-sm mt-2">
                            Save songs by tapping the heart icon
                        </p>
                        <button
                            onClick={() => navigate('/search')}
                            className="mt-6 bg-ns-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform text-sm"
                        >
                            Find songs
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {songs.map(song => (
                            <div key={song.id} className="relative group">
                                <SongCard
                                    song={song}
                                    onPlay={handlePlay}
                                />
                                {/* Unlike button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleUnlike(song)
                                    }}
                                    className="absolute top-2 right-2 w-7 h-7 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 text-sm"
                                    title="Remove from liked songs"
                                >
                                    ♥
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LikedSongsPage