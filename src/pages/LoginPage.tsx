import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // prevents page reload on form submit
        setError('')
        setIsLoading(true)

        try {
            await login(email, password)
            navigate('/') // redirect to home after login
        } catch (err: unknown) {
             const error = err as { response?: { data?: { message?: string } } }
            // Show the error message from the API
            setError(
                error.response?.data?.message || 'Login failed. Please try again.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-ns-black flex flex-col items-center justify-center px-4">

            {/* Logo */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-ns-white">🎵 NeuroSound</h1>
                <p className="text-ns-gray mt-2">Log in to continue</p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-ns-dark rounded-xl p-8">

                <h2 className="text-2xl font-bold text-ns-white mb-6 text-center">
                    Log In
                </h2>

                {/* Error message */}
                {error && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Email field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-ns-white text-sm font-medium">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                            className="bg-ns-card border border-ns-light-gray rounded-md px-4 py-3 text-ns-white placeholder-ns-gray text-sm focus:outline-none focus:border-ns-white transition-colors"
                        />
                    </div>

                    {/* Password field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-ns-white text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            required
                            className="bg-ns-card border border-ns-light-gray rounded-md px-4 py-3 text-ns-white placeholder-ns-gray text-sm focus:outline-none focus:border-ns-white transition-colors"
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-ns-green hover:bg-ns-green-dark text-black font-bold py-3 rounded-full mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>

                </form>

                {/* Signup link */}
                <p className="text-ns-gray text-sm text-center mt-6">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-ns-white font-medium hover:text-ns-green transition-colors"
                    >
                        Sign up for NeuroSound
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage