import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSongs } from '../hooks/useSongs'
import { useArtists } from '../hooks/useArtists'
import SongCard from '../components/ui/SongCard'
import ArtistCard from '../components/ui/ArtistCard'
import SectionHeader from '../components/ui/SectionHeader'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import type { Song, Artist } from '../types'

const HomePage = () => {
    const { user } = useAuth()
    const { songs, isLoading: songsLoading } = useSongs(1, 12)
    const { artists, isLoading: artistsLoading } = useArtists()
    const navigate = useNavigate()

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good Morning'
        if (hour < 17) return 'Good Afternoon'
        return 'Good Evening'
    }

    const handleSongPlay = (song: Song) => {
        // We'll connect this to the player in Week 5
        console.log('Playing song:', song.title)
    }

    const handleArtistClick = (artist: Artist) => {
        navigate(`/artist/${artist.id}`)
    }

    return (
        <div className="px-6 py-4 pb-8">

            {/* Greeting */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-ns-white">
                    {getGreeting()}, {user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-ns-gray mt-1 text-sm">
                    What do you want to listen to today?
                </p>
            </div>

            {/* Recently Added Songs */}
            <section className="mb-10">
                <SectionHeader
                    title="Recently Added"
                    showAll={songs.length > 0}
                    onShowAll={() => navigate('/songs')}
                />

                {songsLoading ? (
                    <LoadingSkeleton count={6} />
                ) : songs.length === 0 ? (
                    <div className="bg-ns-card rounded-md p-8 text-center">
                        <p className="text-ns-gray">No songs yet.</p>
                        <p className="text-ns-light-gray text-sm mt-1">
                            Upload songs from the backend to see them here.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {songs.slice(0, 12).map(song => (
                            <SongCard
                                key={song.id}
                                song={song}
                                onPlay={handleSongPlay}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Artists */}
            <section className="mb-10">
                <SectionHeader
                    title="Artists"
                    showAll={artists.length > 0}
                    onShowAll={() => navigate('/artists')}
                />

                {artistsLoading ? (
                    <LoadingSkeleton count={6} />
                ) : artists.length === 0 ? (
                    <div className="bg-ns-card rounded-md p-8 text-center">
                        <p className="text-ns-gray">No artists yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {artists.slice(0, 6).map(artist => (
                            <ArtistCard
                                key={artist.id}
                                artist={artist}
                                onClick={handleArtistClick}
                            />
                        ))}
                    </div>
                )}
            </section>

        </div>
    )
}

export default HomePage