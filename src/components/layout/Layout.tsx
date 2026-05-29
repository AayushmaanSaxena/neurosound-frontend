import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import PlayerBar from './PlayerBar'

// Layout wraps every page
// Outlet is where the current page renders
// Think of it like a frame — sidebar and player are always visible
// only the middle content changes when you navigate

const Layout = () => {
    return (
        <div className="flex flex-col h-screen bg-ns-black">

            {/* Main area — sidebar + content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left sidebar — always visible */}
                <Sidebar />

                {/* Right of sidebar — gradient background + page content */}
                <main className="flex-1 bg-gradient-to-b from-ns-dark to-ns-black overflow-y-auto">
                    <Outlet />
                    {/* Outlet renders the current page here */}
                </main>

            </div>

            {/* Bottom player bar — always visible */}
            <PlayerBar />

        </div>
    )
}

export default Layout