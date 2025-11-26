import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout Component
 * 
 * Provides consistent page structure across the application.
 * 
 * Structure:
 * - Navbar at the top (always shown)
 * - Main content area in the middle (children)
 * - Footer at the bottom (hidden on login page)
 * 
 * The layout uses flexbox to ensure the footer stays at the bottom
 * even when content is short.
 */
export default function Layout({ children }) {
    const location = useLocation();

    // Don't show footer on login page for cleaner look
    const isLoginPage = location.pathname === '/login';

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
            {/* Navigation bar at top */}
            <Navbar />

            {/* Main content area - grows to fill available space */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer at bottom - hidden on login page */}
            {!isLoginPage && <Footer />}
        </div>
    );
}
