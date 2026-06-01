import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// ─────────────────────────────────────────
// PROTECTED ROUTE
// Wrap any route with this to require login
// If not logged in → redirect to /login
// If still checking auth → show nothing (prevents flash)
// If logged in → show the page
// ─────────────────────────────────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn, isLoading } = useAuth()

    // Still checking if user is logged in
    // Show nothing to prevent flash of login page
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-ns-black">
                <div className="text-ns-green text-xl">Loading...</div>
            </div>
        )
    }

    // Not logged in → redirect to login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    // Logged in → show the page
    return <>{children}</>
}

export default ProtectedRoute