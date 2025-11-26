import React from 'react';
import ProfileMenu from '../components/ProfileMenu';
import Chatbot from '../components/Chatbot';

/**
 * Dashboard Component
 * 
 * Simplified dashboard with:
 * - Top navbar with DevHub branding and profile menu
 * - Chatbot for AI assistance
 * 
 * Note: Feed content, issues, and projects will be implemented by your teammate
 */
export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#0d1117]">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-[#161b22] border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left side - DevHub branding */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">DH</span>
                                </div>
                                <span className="text-white font-semibold text-lg">DevHub</span>
                            </div>
                        </div>

                        {/* Right side - Profile Menu */}
                        <div className="flex items-center">
                            <ProfileMenu />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area - Empty for teammate to implement */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-slate-400 py-20">
                    <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-300 mb-2">Dashboard Content Coming Soon</h2>
                    <p className="text-sm">Your teammate will implement the feed and project management here.</p>
                </div>
            </main>

            {/* Chatbot - Always available */}
            <Chatbot />
        </div>
    );
}
