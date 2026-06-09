import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ui/ProtectedRoute'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import LibraryPage from './pages/LibraryPage'
import LikedSongsPage from './pages/LikedSongsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
    return (
        <Routes>
            {/* Routes that use the main layout (sidebar + player) */}
            <Route path="/" element={ 
                <ProtectedRoute>
                <Layout />
                </ProtectedRoute>}>
                <Route index element={<HomePage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="library" element={<LibraryPage />} />
                <Route path="liked-songs" element={<LikedSongsPage />} />
            </Route>

            {/* Auth routes — full screen, no sidebar */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 404 — catch all unmatched routes */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App