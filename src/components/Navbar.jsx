import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';

/**
 * Navbar Component
 * 
 * Main navigation bar displayed at the top of all public pages.
 * 
 * Features:
 * - DevHub logo and branding
 * - Navigation links (Docs, Sign In, Sign Up)
 * - Responsive mobile menu (hamburger menu on small screens)
 * - Sticky positioning (stays at top when scrolling)
 * 
 * The navbar is responsive:
 * - Desktop: Shows all links in a horizontal row
 * - Mobile: Shows hamburger menu that expands to show links vertically
 */
export default function Navbar() {
    // Track whether mobile menu is open or closed
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#0d1117] sticky top-0 z-50 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Left Side - Logo */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            {/* Logo Icon */}
                            <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                <Code2 className="w-8 h-8 text-white" />
                            </div>
                            {/* Brand Name */}
                            <span className="font-bold text-xl text-white tracking-tight">DevHub</span>
                        </Link>
                    </div>

                    {/* Right Side - Desktop Navigation (hidden on mobile) */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/docs" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                            Docs
                        </Link>
                        <Link to="/login" className="text-white hover:text-slate-300 font-medium text-sm transition-colors">
                            Sign In
                        </Link>
                        <Link to="/signup" className="px-3 py-1.5 rounded-md border border-white text-white text-sm font-medium hover:bg-white hover:text-slate-900 transition-all">
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button (shown only on mobile) */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {/* Toggle between X and Menu icon based on menu state */}
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu (shown only when isOpen is true) */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-slate-800">
                        <div className="flex flex-col space-y-4">
                            {/* Mobile menu links - close menu when clicked */}
                            <Link
                                to="/docs"
                                className="text-slate-300 hover:text-white font-medium text-sm transition-colors px-2 py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Docs
                            </Link>
                            <Link
                                to="/login"
                                className="text-white hover:text-slate-300 font-medium text-sm transition-colors px-2 py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-3 py-2 rounded-md border border-white text-white text-sm font-medium hover:bg-white hover:text-slate-900 transition-all text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
