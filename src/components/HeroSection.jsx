import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HeroSection - The main landing section of the home page
 * 
 * Features:
 * - Large heading with tagline
 * - Email signup form
 * - Background effects (animated purple/blue glowing blobs)
 * - CTA buttons for signup and trying Copilot
 */
export default function HeroSection({ email, onEmailChange, onSignup }) {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-24 sm:pb-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/80 via-[#0d1117]/50 to-[#0d1117]" />

                {/* Animated Glowing Blobs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/30 rounded-full blur-3xl filter mix-blend-screen animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-600/30 rounded-full blur-3xl filter mix-blend-screen animate-pulse delay-1000" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto mt-10 sm:mt-20">
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 leading-tight px-2">
                    The future of building <br className="hidden sm:block" />
                    <span className="sm:hidden">happens together</span>
                    <span className="hidden sm:inline">happens together</span>
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
                    Tools and trends evolve, but collaboration endures. With DevHub,
                    developers, agents, and code come together on one platform.
                </p>

                {/* Email Signup Form */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-lg mx-auto px-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-md bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                    />
                    <button
                        onClick={() => onSignup(email)}
                        className="w-full sm:w-auto whitespace-nowrap px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition-colors text-sm sm:text-base"
                    >
                        Sign up for DevHub
                    </button>
                </div>

                {/* Secondary CTA */}
                <div className="mt-6 px-4">
                    <Link to="/login" className="inline-block px-6 py-3 border border-slate-600 rounded-md text-white font-bold hover:border-slate-400 transition-colors text-sm sm:text-base">
                        Try DevHub Copilot free
                    </Link>
                </div>
            </div>
        </section>
    );
}
