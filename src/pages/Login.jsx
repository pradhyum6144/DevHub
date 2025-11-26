import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Login Page Component
 * 
 * Handles user authentication with email and password.
 * 
 * Features:
 * - Email and password input fields with icons
 * - Real-time validation
 * - Error message display
 * - Loading state during authentication
 * - Remember me checkbox
 * - Link to signup page
 * - Forgot password link (placeholder)
 * 
 * After successful login, redirects user to dashboard.
 */
export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from AuthContext

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Shows loading spinner during login
    const [error, setError] = useState(''); // Stores error messages to display

    /**
     * Handle form submission
     * 
     * Flow:
     * 1. Prevent default form behavior
     * 2. Clear any previous errors
     * 3. Set loading state
     * 4. Call login function from AuthContext
     * 5. Navigate to dashboard on success
     * 6. Display error message on failure
     */
    async function handleSubmit(e) {
        e.preventDefault();
        setError(''); // Clear previous errors
        setLoading(true);

        try {
            await login(email, password); // Call AuthContext login
            navigate('/dashboard'); // Redirect to dashboard on success
        } catch (err) {
            setError(err.message); // Display error to user
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <div className="min-h-screen bg-[#0d1117] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects - Animated gradient blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl filter mix-blend-screen animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl filter mix-blend-screen animate-pulse delay-1000" />
            </div>

            {/* Header Section */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                {/* Logo */}
                <div className="flex justify-center">
                    <Link to="/" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <Code2 className="w-12 h-12 text-white" />
                    </Link>
                </div>

                {/* Title */}
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    Sign in to DevHub
                </h2>

                {/* Link to signup page */}
                <p className="mt-2 text-center text-sm text-slate-400">
                    New to DevHub?{' '}
                    <Link to="/signup" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
                        Create an account →
                    </Link>
                </p>
            </div>

            {/* Form Section */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-[#161b22] py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-slate-800">
                    {/* Error Message */}
                    {error && (
                        <ErrorMessage message={error} type="error" className="mb-4" />
                    )}

                    {/* Login Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={Mail}
                            placeholder="Email"
                            autoComplete="email"
                            required
                        />

                        {/* Password Field */}
                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={Lock}
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                        />

                        {/* Remember Me & Forgot Password Row */}
                        <div className="flex items-center justify-between">
                            {/* Remember Me Checkbox */}
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-700 bg-[#0d1117] text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                                    Remember me
                                </label>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            fullWidth
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
