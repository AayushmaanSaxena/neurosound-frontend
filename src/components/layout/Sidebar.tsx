import { NavLink } from 'react-router-dom'

// NavLink is like a regular link but automatically
// adds an 'active' class when the URL matches

const Sidebar = () => {
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
                <p className="text-ns-gray text-xs font-semibold uppercase tracking-widest px-3 mb-2">
                    Playlists
                </p>
                {/* Playlists will be loaded here in Day 5 */}
                <p className="text-ns-light-gray text-sm px-3">
                    No playlists yet
                </p>
            </div>

        </div>
    )
}

export default Sidebar