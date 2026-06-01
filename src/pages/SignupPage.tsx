import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SignupPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        // Basic frontend validation
        if (name.trim().length < 2) {
            setError('Name must be at least 2 characters')
            return
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        if (!/\d/.test(password)) {
            setError('Password must contain at least one number')
            return
        }

        setIsLoading(true)

        try {
            await signup(name, email, password)
            navigate('/') // redirect to home after signup
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } }
            setError(
                error.response?.data?.message || 'Signup failed. Please try again.'
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
                <p className="text-ns-gray mt-2">Sign up for free music</p>
            </div>

            {/* Signup Card */}
            <div className="w-full max-w-md bg-ns-dark rounded-xl p-8">

                <h2 className="text-2xl font-bold text-ns-white mb-6 text-center">
                    Create Account
                </h2>

                {/* Error message */}
                {error && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Name field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-ns-white text-sm font-medium">
                            Your name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            className="bg-ns-card border border-ns-light-gray rounded-md px-4 py-3 text-ns-white placeholder-ns-gray text-sm focus:outline-none focus:border-ns-white transition-colors"
                        />
                    </div>

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
                            placeholder="At least 6 characters with one number"
                            required
                            className="bg-ns-card border border-ns-light-gray rounded-md px-4 py-3 text-ns-white placeholder-ns-gray text-sm focus:outline-none focus:border-ns-white transition-colors"
                        />
                        <p className="text-ns-gray text-xs mt-1">
                            Must be at least 6 characters and contain a number
                        </p>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-ns-green hover:bg-ns-green-dark text-black font-bold py-3 rounded-full mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>

                </form>

                {/* Login link */}
                <p className="text-ns-gray text-sm text-center mt-6">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-ns-white font-medium hover:text-ns-green transition-colors"
                    >
                        Log in here
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default SignupPage