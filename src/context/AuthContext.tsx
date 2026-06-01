import { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react'
import type { ReactNode } from 'react'
import api from '../services/api'
import type { User } from '../types'

interface AuthContextType {
    user: User | null
    isLoggedIn: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const hasChecked = useRef(false)

    useEffect(() => {
        if (hasChecked.current) return
        hasChecked.current = true

        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken')
            if (!token) return

            setIsLoading(true)
            try {
                const response = await api.get('/auth/me')
                setUser(response.data.user)
            } catch {
                localStorage.removeItem('accessToken')
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password })
        localStorage.setItem('accessToken', response.data.accessToken)
        setUser(response.data.user)
    }

    const signup = async (name: string, email: string, password: string) => {
        await api.post('/auth/register', { name, email, password })
        await login(email, password)
    }

    const logout = async () => {
        try {
            await api.post('/auth/logout')
        } catch {
            // continue even if API call fails
        }
        localStorage.removeItem('accessToken')
        setUser(null)
    }

    // ─────────────────────────────────────────
    // useMemo prevents a new context value object
    // being created on every render
    // Without this every render causes all consumers
    // to re-render even if nothing changed
    // ─────────────────────────────────────────
    const value = useMemo(() => ({
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        signup,
        logout
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [user, isLoading])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider')
    }
    return context
}