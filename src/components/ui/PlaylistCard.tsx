import { useNavigate } from 'react-router-dom'
import type { Playlist } from '../../types'

interface PlaylistCardProps {
    playlist: Playlist
    onClick?: (playlist: Playlist) => void
}

const PlaylistCard = ({ playlist, onClick }: PlaylistCardProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (onClick) {
            onClick(playlist)
        } else {
            navigate(`/playlist/${playlist.id}`)
        }
    }

    return (
        <div
            className="bg-ns-card hover:bg-ns-hover rounded-md p-4 cursor-pointer transition-colors group"
            onClick={handleClick}
        >
            {/* Cover image */}
            <div className="relative mb-4">
                <div className="w-full aspect-square rounded-md overflow-hidden bg-ns-hover">
                    {playlist.cover_image ? (
                        <img
                            src={playlist.cover_image}
                            alt={playlist.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        // Default playlist icon when no cover image
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ns-light-gray to-ns-card">
                            <span className="text-4xl">🎵</span>
                        </div>
                    )}
                </div>

                {/* Play button on hover */}
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-ns-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <span className="text-black text-sm ml-0.5">▶</span>
                </button>
            </div>

            {/* Playlist info */}
            <p className="text-ns-white font-medium text-sm truncate">
                {playlist.name}
            </p>
            <p className="text-ns-gray text-xs mt-1">
                {playlist.song_count !== undefined
                    ? `${playlist.song_count} song${playlist.song_count !== 1 ? 's' : ''}`
                    : 'Playlist'
                }
            </p>
        </div>
    )
}

export default PlaylistCard