import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * 
 * A wrapper component that protects routes from unauthorized access.
 * 
 * How it works:
 * 1. Checks if user is authenticated via AuthContext
 * 2. Shows loading spinner while checking authentication status
 * 3. Redirects to login page if user is not authenticated
 * 4. Renders the protected content if user is authenticated
 * 
 * Usage:
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Show loading spinner while checking if user is logged in
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // If no user is logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is authenticated, show the protected content
    return children;
}
