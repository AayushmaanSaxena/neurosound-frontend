import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import usePlaylists from '../../hooks/usePlaylists'

const Sidebar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const { playlists } = usePlaylists()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <div className="w-64 bg-ns-black flex flex-col h-full">

            {/* Logo */}
            <div className="p-6 pb-2">
                <h1 className="text-ns-white text-2xl font-bold">
                    🎵 NeuroSound
                </h1>
            </div>

            {/* Main Navigation */}
            <nav className="px-3 py-2">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive
                                ? 'text-ns-white bg-ns-hover'
                                : 'text-ns-gray hover:text-ns-white'
                        }`
                    }
                >
                    <span className="text-xl">🏠</span>
                    Home
                </NavLink>

                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive
                                ? 'text-ns-white bg-ns-hover'
                                : 'text-ns-gray hover:text-ns-white'
                        }`
                    }
                >
                    <span className="text-xl">🔍</span>
                    Search
                </NavLink>

                <NavLink
                    to="/library"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive
                                ? 'text-ns-white bg-ns-hover'
                                : 'text-ns-gray hover:text-ns-white'
                        }`
                    }
                >
                    <span className="text-xl">📚</span>
                    Your Library
                </NavLink>
            </nav>

            {/* Divider */}
            <div className="mx-3 my-2 border-t border-ns-light-gray opacity-30" />

             {/* Playlists section */}
            <div className="px-3 py-2 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between px-3 mb-2">
                    <p className="text-ns-gray text-xs font-semibold uppercase tracking-widest">
                        Playlists
                    </p>
                </div>

                {/* Liked Songs link */}
                <NavLink
                    to="/liked-songs"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                            isActive
                                ? 'text-ns-white bg-ns-hover'
                                : 'text-ns-gray hover:text-ns-white'
                        }`
                    }
                >
                    <span>💜</span>
                    Liked Songs
                </NavLink>

                {/* User playlists */}
                {playlists.length === 0 ? (
                    <p className="text-ns-light-gray text-xs px-3 mt-2">
                        No playlists yet
                    </p>
                ) : (
                    playlists.map(playlist => (
                        <NavLink
                            key={playlist.id}
                            to={`/playlist/${playlist.id}`}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors truncate ${
                                    isActive
                                        ? 'text-ns-white bg-ns-hover'
                                        : 'text-ns-gray hover:text-ns-white'
                                }`
                            }
                        >
                            <span>🎵</span>
                            <span className="truncate">{playlist.name}</span>
                        </NavLink>
                    ))
                )}
            </div>

            {/* User section at bottom */}
            {user && (
                <div className="p-3 border-t border-ns-card">
                    <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-ns-hover transition-colors">
                        {/* Avatar */}
                        <div className="w-8 h-8 bg-ns-green rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-black text-sm font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        {/* Name */}
                        <span className="text-ns-white text-sm font-medium flex-1 truncate">
                            {user.name}
                        </span>
                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="text-ns-gray hover:text-ns-white text-xs transition-colors"
                            title="Log out"
                        >
                            ⏏
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Sidebar