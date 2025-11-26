import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * AuthContext - Manages user authentication state across the app
 * 
 * Provides:
 * - user: Current logged-in user object (null if not logged in)
 * - login: Function to log in with email/password
 * - signup: Function to create a new account
 * - logout: Function to log out
 * - loading: Boolean indicating if session is being verified
 * - refreshUser: Function to refresh user data from backend
 * - updateUser: Function to update user data in context
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // State
    const [user, setUser] = useState(null); // Current user object or null
    const [loading, setLoading] = useState(true); // Loading state for initial session check

    // On component mount, verify if user has an active session
    useEffect(() => {
        verifySession();
    }, []);

    // Get API URL from environment variable or use default
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    /**
     * Verify if user has an active session
     * Called on app load to restore user session
     * Uses cookies for authentication (credentials: 'include')
     */
    const verifySession = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/verify`, {
                credentials: 'include' // Send cookies with request
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user); // Restore user session
            }
        } catch (error) {
            console.error('Session verification failed:', error);
        } finally {
            setLoading(false); // Done loading
        }
    };

    /**
     * Refresh user data from backend
     * Useful after profile updates to sync latest data
     */
    const refreshUser = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/verify`, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user); // Update user with latest data
            }
        } catch (error) {
            console.error('Failed to refresh user data:', error);
        }
    };

    /**
     * Update user in context (for immediate UI updates)
     * Merges updates with existing user object
     * Use this for optimistic UI updates before backend sync
     */
    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    /**
     * Login function
     * 
     * Flow:
     * 1. Send POST request to /api/auth/login with email and password
     * 2. Backend validates credentials and creates session
     * 3. Backend sends session cookie in response
     * 4. Update user state with returned user object
     * 
     * Error handling:
     * - Parse error message from backend response
     * - Provide user-friendly messages for common errors
     */
    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Receive session cookie
                body: JSON.stringify({ email, password })
            });

            // Check response status BEFORE parsing JSON
            if (!response.ok) {
                // Try to parse error message from backend
                let errorMessage = 'Login failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (parseError) {
                    // Fallback to status text if JSON parsing fails
                    errorMessage = response.statusText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            // Success: parse response and update user state
            const data = await response.json();
            setUser(data.user);
            return data;
        } catch (error) {
            console.error('Login error:', error);
            // Provide user-friendly error for connection issues
            if (error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to server. Please check if the server is running.');
            }
            throw error;
        }
    };

    /**
     * Signup function
     * 
     * Flow:
     * 1. Send POST request to /api/auth/signup with email, username, and password
     * 2. Backend creates new user account and session
     * 3. Backend sends session cookie in response
     * 4. Update user state with new user object
     * 
     * Similar error handling to login function
     */
    const signup = async (email, username, password) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Receive session cookie
                body: JSON.stringify({ email, username, password })
            });

            // Check response status BEFORE parsing JSON
            if (!response.ok) {
                // Try to parse error message from backend
                let errorMessage = 'Signup failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (parseError) {
                    // Fallback to status text if JSON parsing fails
                    errorMessage = response.statusText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            // Success: parse response and update user state
            const data = await response.json();
            setUser(data.user);
            return data;
        } catch (error) {
            console.error('Signup error:', error);
            // Provide user-friendly error for connection issues
            if (error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to server. Please check if the server is running.');
            }
            throw error;
        }
    };

    /**
     * Logout function
     * 
     * Flow:
     * 1. Send POST request to /api/auth/logout
     * 2. Backend destroys session
     * 3. Clear user state (even if request fails)
     */
    const logout = async () => {
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include' // Send session cookie
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
        setUser(null); // Always clear user state
    };

    // Provide authentication state and functions to all child components
    return (
        <AuthContext.Provider value={{
            user,          // Current user object or null
            login,         // Login function
            signup,        // Signup function
            logout,        // Logout function
            loading,       // Loading state for session verification
            refreshUser,   // Refresh user data from backend
            updateUser     // Update user data in context
        }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth Hook
 * 
 * Custom hook to access authentication context
 * Must be used within AuthProvider component
 * 
 * Usage:
 * const { user, login, logout } = useAuth();
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
