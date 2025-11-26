import React from 'react';
import { Link } from 'react-router-dom';

/**
 * FooterCTA - Final call-to-action section at the bottom of the home page
 * 
 * Features:
 * - Character image with multiple glowing effects
 * - Large heading about DevHub community
 * - Email signup form
 * - Multiple CTA buttons (Sign up, Try Copilot)
 */
export default function FooterCTA({ email, onEmailChange, onSignup }) {
    return (
        <section className="relative py-20 sm:py-24 md:py-32 bg-[#0d1117] text-center overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Character Image with Multiple Glow Effects */}
                <div className="mb-12 sm:mb-16 flex justify-center relative">
                    {/* Multiple colored glow effects for visual appeal */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-purple-600/50 rounded-full blur-[80px] sm:blur-[100px] animate-pulse" />
                    <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-blue-500/40 rounded-full blur-[60px] sm:blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 right-1/3 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-pink-500/30 rounded-full blur-[60px] sm:blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />

                    {/* Characters Image */}
                    <img
                        src="/home-footer-characters.png"
                        alt="DevHub Community"
                        className="h-48 sm:h-60 md:h-72 object-contain relative z-10 animate-bounce-slow"
                    />
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
                    Millions of developers and<br className="hidden sm:block" />
                    <span className="sm:hidden">businesses call DevHub home</span>
                    <span className="hidden sm:inline">businesses call DevHub home</span>
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4">
                    Whether you're scaling your development process or just learning how to code,
                    DevHub is where you belong. Join the world's most widely adopted developer platform
                    to build the technologies that shape what's next.
                </p>

                {/* Email Signup Form with Multiple CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-2xl mx-auto">
                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        className="w-full sm:flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-md bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                    />

                    {/* Primary CTA - Sign Up */}
                    <button
                        onClick={() => onSignup(email)}
                        className="w-full sm:w-auto whitespace-nowrap px-6 sm:px-8 py-3 sm:py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition-colors text-sm sm:text-base"
                    >
                        Sign up for DevHub
                    </button>

                    {/* Secondary CTA - Try Copilot */}
                    <Link
                        to="/login"
                        className="w-full sm:w-auto whitespace-nowrap px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-slate-600 rounded-md text-white font-bold hover:border-slate-400 transition-colors text-center text-sm sm:text-base"
                    >
                        Try DevHub Copilot free
                    </Link>
                </div>
            </div>
        </section>
    );
}
