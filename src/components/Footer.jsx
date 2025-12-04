import React from 'react';
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
        <footer className="bg-[#0d1117] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center">
                        <span className="font-semibold text-slate-500 dark:text-slate-400">DevHub</span>
                    </div>

                    {/* <div className="flex flex-wrap gap-8 text-sm text-slate-500 dark:text-slate-400">
                        <Link to="/docs" className="hover:text-slate-900 dark:hover:text-white transition-colors">Docs</Link>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">API</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Status</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Support</a>
                    </div> */}

                    <div className="text-sm text-slate-400">
                        © 2025 DevHub
                    </div>
                </div>
            </div>
        </footer>
    );
}
