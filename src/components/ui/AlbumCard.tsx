import type { Album } from '../../types'

interface AlbumCardProps {
    album: Album
    onClick?: (album: Album) => void
}

const AlbumCard = ({ album, onClick }: AlbumCardProps) => {
    return (
        <div
            className="bg-ns-card hover:bg-ns-hover rounded-md p-4 cursor-pointer transition-colors group"
            onClick={() => onClick?.(album)}
        >
            {/* Cover image */}
            <div className="relative mb-4">
                <div className="w-full aspect-square rounded-md overflow-hidden bg-ns-hover">
                    {album.cover_image ? (
                        <img
                            src={album.cover_image}
                            alt={album.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl">💿</span>
                        </div>
                    )}
                </div>

                {/* Play button on hover */}
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-ns-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <span className="text-black text-sm ml-0.5">▶</span>
                </button>
            </div>

            {/* Album info */}
            <p className="text-ns-white font-medium text-sm truncate">
                {album.title}
            </p>
            <p className="text-ns-gray text-xs mt-1 truncate">
                {album.release_year
                    ? `${album.release_year} • ${album.artist_name || 'Unknown'}`
                    : album.artist_name || 'Unknown Artist'
                }
            </p>
        </div>
    )
}

export default AlbumCard