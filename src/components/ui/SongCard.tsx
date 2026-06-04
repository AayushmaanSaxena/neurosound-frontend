import type { Song } from '../../types'

interface SongCardProps {
    song: Song
    onPlay?: (song: Song) => void
    showArtist?: boolean
}

const SongCard = ({ song, onPlay, showArtist = true }: SongCardProps) => {
    // Format duration from seconds to mm:ss
    const formatDuration = (seconds: number | null) => {
        if (!seconds) return '--:--'
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div
            className="bg-ns-card hover:bg-ns-hover rounded-md p-4 cursor-pointer transition-colors group"
            onClick={() => onPlay?.(song)}
        >
            {/* Cover image */}
            <div className="relative mb-4">
                <div className="w-full aspect-square rounded-md overflow-hidden bg-ns-hover">
                    {song.cover_image ? (
                        <img
                            src={song.cover_image}
                            alt={song.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl">🎵</span>
                        </div>
                    )}
                </div>

                {/* Play button — appears on hover */}
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-ns-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg hover:scale-105">
                    <span className="text-black text-sm ml-0.5">▶</span>
                </button>
            </div>

            {/* Song info */}
            <div>
                <p className="text-ns-white font-medium text-sm truncate">
                    {song.title}
                </p>
                {showArtist && (
                    <p className="text-ns-gray text-xs mt-1 truncate">
                        {song.artist_name || 'Unknown Artist'}
                    </p>
                )}
                <p className="text-ns-light-gray text-xs mt-1">
                    {formatDuration(song.duration)}
                </p>
            </div>
        </div>
    )
}

export default SongCard