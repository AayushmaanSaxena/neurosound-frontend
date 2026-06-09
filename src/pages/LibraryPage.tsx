import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usePlaylists from '../hooks/usePlaylists'
import PlaylistCard from '../components/ui/PlaylistCard'
import Modal from '../components/ui/Modal'
import SectionHeader from '../components/ui/SectionHeader'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

const LibraryPage = () => {
    const { playlists, isLoading, createPlaylist } = usePlaylists()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newPlaylistName, setNewPlaylistName] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [createError, setCreateError] = useState('')
    const navigate = useNavigate()

    const handleCreatePlaylist = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newPlaylistName.trim()) {
            setCreateError('Please enter a playlist name')
            return
        }

        setIsCreating(true)
        setCreateError('')

        try {
            await createPlaylist(newPlaylistName.trim())
            setNewPlaylistName('')
            setIsModalOpen(false)
        } catch {
            setCreateError('Failed to create playlist. Please try again.')
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="px-6 py-4 pb-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-ns-white">Your Library</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-ns-green hover:bg-ns-green-dark text-black text-sm font-bold px-4 py-2 rounded-full transition-colors"
                >
                    <span className="text-lg leading-none">+</span>
                    New Playlist
                </button>
            </div>

            {/* Liked Songs Card — always shows at top */}
            <section className="mb-10">
                <SectionHeader title="Your Collection" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

                    {/* Liked Songs special card */}
                    <div
                        className="bg-gradient-to-br from-purple-700 to-blue-900 rounded-md p-4 cursor-pointer hover:opacity-90 transition-opacity group relative"
                        onClick={() => navigate('/liked-songs')}
                    >
                        <div className="w-full aspect-square flex items-center justify-center mb-4">
                            <span className="text-5xl">💜</span>
                        </div>
                        <p className="text-ns-white font-bold text-sm">Liked Songs</p>
                        <p className="text-ns-gray text-xs mt-1">Your favourite tracks</p>

                        {/* Play button on hover */}
                        <button className="absolute bottom-6 right-4 w-10 h-10 bg-ns-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg">
                            <span className="text-black text-sm ml-0.5">▶</span>
                        </button>
                    </div>

                </div>
            </section>

            {/* Playlists */}
            <section>
                <SectionHeader title="Your Playlists" />

                {isLoading ? (
                    <LoadingSkeleton count={6} />
                ) : playlists.length === 0 ? (
                    <div className="bg-ns-card rounded-md p-8 text-center">
                        <p className="text-ns-white font-medium">No playlists yet</p>
                        <p className="text-ns-gray text-sm mt-2">
                            Create your first playlist to get started
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 bg-ns-white text-black text-sm font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform"
                        >
                            Create playlist
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {playlists.map(playlist => (
                            <PlaylistCard
                                key={playlist.id}
                                playlist={playlist}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Create Playlist Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setNewPlaylistName('')
                    setCreateError('')
                }}
                title="Create Playlist"
            >
                <form onSubmit={handleCreatePlaylist} className="flex flex-col gap-4">

                    {createError && (
                        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                            {createError}
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <label className="text-ns-white text-sm font-medium">
                            Playlist name
                        </label>
                        <input
                            type="text"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            placeholder="My awesome playlist"
                            autoFocus
                            className="bg-ns-card border border-ns-light-gray rounded-md px-4 py-3 text-ns-white placeholder-ns-gray text-sm focus:outline-none focus:border-ns-white transition-colors"
                        />
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false)
                                setNewPlaylistName('')
                                setCreateError('')
                            }}
                            className="flex-1 bg-ns-card hover:bg-ns-hover text-ns-white text-sm font-medium py-3 rounded-full transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="flex-1 bg-ns-green hover:bg-ns-green-dark text-black text-sm font-bold py-3 rounded-full transition-colors disabled:opacity-50"
                        >
                            {isCreating ? 'Creating...' : 'Create'}
                        </button>
                    </div>

                </form>
            </Modal>

        </div>
    )
}

export default LibraryPage