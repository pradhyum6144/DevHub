import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthCallback from './pages/AuthCallback';
import Docs from './pages/Docs';
import Dashboard from './pages/Dashboard';
import ProfileSettings from './pages/ProfileSettings';

/**
 * App Component - Main Application Entry Point
 * 
 * This is the root component of the DevHub application.
 * It sets up:
 * - Authentication context (AuthProvider) for managing user sessions
 * - Client-side routing (Router) for navigation
 * - Layout wrapper for consistent UI across pages
 * - Protected routes for authenticated-only pages
 * 
 * Route Structure:
 * - Public routes: Home, Login, SignUp, Docs, AuthCallback
 * - Protected routes: Dashboard, ProfileSettings (require authentication)
 */
function App() {
    return (
        // Wrap entire app with AuthProvider to make auth state available everywhere
        <AuthProvider>
            {/* Set up client-side routing */}
            <Router>
                <Routes>
                    {/* Public Routes - Anyone can access these */}
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/login" element={<Layout><Login /></Layout>} />
                    <Route path="/signup" element={<Layout><SignUp /></Layout>} />
                    <Route path="/auth/callback" element={<Layout><AuthCallback /></Layout>} />
                    <Route path="/docs" element={<Layout><Docs /></Layout>} />

                    {/* Protected Routes - Require authentication */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings/profile"
                        element={
                            <ProtectedRoute>
                                <ProfileSettings />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

