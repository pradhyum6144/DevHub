import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Code2, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword, validateUsername } from '../utils/validation';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';

/**
 * SignUp Page Component
 * 
 * Handles new user registration with:
 * - Email, username, and password fields
 * - Real-time validation with helpful error messages
 * - Pre-filled email from URL parameter (if user came from home page signup)
 * - Loading state during account creation
 * - Automatic redirect to dashboard after successful signup
 * 
 * Form Validation:
 * - Email: Must be valid email format
 * - Password: Minimum 8 characters
 * - Username: Minimum 3 characters, alphanumeric only
 */
export default function SignUp() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { signup } = useAuth();

    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    // Form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });

    // Validation errors
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        username: ''
    });

    // Track which fields have been touched (for showing errors only after user interaction)
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        username: false
    });

    // Pre-fill email from URL parameter if present (e.g., /signup?email=user@example.com)
    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setFormData(prev => ({
                ...prev,
                email: emailParam
            }));
        }
    }, [searchParams]);

    /**
     * Handle input field changes
     * Validates the field if it has been touched before
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change if field has been touched
        if (touched[name]) {
            let error = '';
            if (name === 'email') error = validateEmail(value);
            else if (name === 'password') error = validatePassword(value);
            else if (name === 'username') error = validateUsername(value);

            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    /**
     * Handle field blur (when user leaves a field)
     * Marks field as touched and validates it
     */
    const handleBlur = (e) => {
        const { name, value } = e.target;

        // Mark field as touched
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        // Validate the field
        let error = '';
        if (name === 'email') error = validateEmail(value);
        else if (name === 'password') error = validatePassword(value);
        else if (name === 'username') error = validateUsername(value);

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    /**
     * Handle form submission
     * Validates all fields and creates account if valid
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        // Mark all fields as touched
        setTouched({
            email: true,
            password: true,
            username: true
        });

        // Validate all fields
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const usernameError = validateUsername(formData.username);

        setErrors({
            email: emailError,
            password: passwordError,
            username: usernameError
        });

        // If no errors, proceed with signup
        if (!emailError && !passwordError && !usernameError) {
            setLoading(true);
            try {
                await signup(formData.email, formData.username, formData.password);
                navigate('/dashboard'); // Redirect to dashboard after successful signup
            } catch (error) {
                setServerError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

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
                    Sign up for DevHub
                </h2>

                {/* Link to login page */}
                <p className="mt-2 text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
                        Sign in →
                    </Link>
                </p>
            </div>

            {/* Form Section */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-[#161b22] py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-slate-800">
                    {/* Server Error Message */}
                    {serverError && (
                        <ErrorMessage message={serverError} type="error" className="mb-4" />
                    )}

                    {/* Signup Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email}
                            touched={touched.email}
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
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.password}
                            touched={touched.password}
                            icon={Lock}
                            placeholder="Password"
                            autoComplete="new-password"
                            helpText="Password should be at least 8 characters including a number and a lowercase letter"
                            required
                        />

                        {/* Username Field */}
                        <FormInput
                            label="Username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.username}
                            touched={touched.username}
                            icon={User}
                            placeholder="Username"
                            autoComplete="username"
                            helpText="Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen"
                            required
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            fullWidth
                        >
                            {loading ? 'Creating account...' : 'Create account'}
                        </Button>

                        {/* Terms and Privacy Notice */}
                        <p className="text-xs text-slate-500 text-center">
                            By creating an account, you agree to the{' '}
                            <a href="#" className="text-blue-500 hover:underline">
                                Terms of Service
                            </a>
                            . For more information about DevHub's privacy practices, see the{' '}
                            <a href="#" className="text-blue-500 hover:underline">
                                DevHub Privacy Statement
                            </a>
                            . We'll occasionally send you account-related emails.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
