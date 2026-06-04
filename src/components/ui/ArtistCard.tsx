import type { Artist } from '../../types'

interface ArtistCardProps {
    artist: Artist
    onClick?: (artist: Artist) => void
}

const ArtistCard = ({ artist, onClick }: ArtistCardProps) => {
    return (
        <div
            className="bg-ns-card hover:bg-ns-hover rounded-md p-4 cursor-pointer transition-colors text-center group"
            onClick={() => onClick?.(artist)}
        >
            {/* Artist image — circular */}
            <div className="relative mb-4">
                <div className="w-full aspect-square rounded-full overflow-hidden bg-ns-hover mx-auto">
                    {artist.image ? (
                        <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl">🎤</span>
                        </div>
                    )}
                </div>

                {/* Play button on hover */}
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-ns-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <span className="text-black text-sm ml-0.5">▶</span>
                </button>
            </div>

            {/* Artist info */}
            <p className="text-ns-white font-medium text-sm truncate">
                {artist.name}
            </p>
            <p className="text-ns-gray text-xs mt-1">Artist</p>
            {artist.song_count !== undefined && (
                <p className="text-ns-light-gray text-xs mt-1">
                    {artist.song_count} songs
                </p>
            )}
        </div>
    )
}

export default ArtistCard