import React from 'react';

/**
 * SecuritySection - Showcases the built-in security features
 * 
 * Features:
 * - Displays a code diff showing XSS vulnerability fix
 * - Purple glow effects for visual appeal
 * - GitHub Advanced Security bot badge
 * - Copilot Autofix branding
 */
export default function SecuritySection() {
    return (
        <section className="relative py-16 sm:py-20 md:py-24 bg-[#0d1117] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
                        Built-in application security<br className="hidden sm:block" />
                        <span className="sm:hidden">where found means fixed</span>
                        <span className="hidden sm:inline">where found means fixed</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto px-4">
                        Use AI to find and fix vulnerabilities so your team can ship more
                        secure software faster.
                    </p>
                </div>

                {/* Main Content Container */}
                <div className="relative">
                    <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl sm:rounded-3xl border border-slate-700/50 p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden">
                        {/* Purple glow effect - positioned in top right */}
                        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-purple-600/40 rounded-full blur-[100px] sm:blur-[150px] animate-pulse" />

                        {/* Content Grid - Text on left, Code card on right */}
                        <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                            {/* Left side - Explanation Text */}
                            <div className="text-left space-y-3 sm:space-y-4">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                                    Apply fixes in seconds.
                                </h3>
                                <p className="text-base sm:text-lg md:text-xl text-slate-400">
                                    Spend less time debugging and more time building features with Copilot Autofix.
                                </p>
                            </div>

                            {/* Right side - Code Diff Card */}
                            <div className="relative">
                                {/* Additional purple glow behind card */}
                                <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-3xl scale-105" />

                                {/* Card with gradient background */}
                                <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
                                    {/* Card Header - GitHub bot info */}
                                    <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-purple-200">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded border border-purple-300 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-slate-800 text-xs sm:text-sm truncate">github-advanced-security</span>
                                        <span className="ml-auto px-1.5 sm:px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded flex-shrink-0">bot</span>
                                    </div>

                                    {/* Vulnerability Description */}
                                    <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                                        <p className="mb-2 sm:mb-3">
                                            The vulnerability in the code is due to the fact that user-provided input is directly used in
                                            HTTP response without any sanitization. This can lead to a cross-site scripting (XSS)
                                            attack if the user input contains malicious scripts.
                                        </p>
                                        <p className="hidden sm:block">
                                            To fix this, we need to sanitize the input before using it in the HTTP response. One way
                                            to do this is to use the <code className="px-1.5 py-0.5 bg-purple-200 text-purple-800 rounded text-xs font-mono">escape-html</code> library, which can escape any special characters.
                                        </p>
                                    </div>

                                    {/* Copilot Autofix Badge */}
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <div className="flex items-center gap-1.5 px-1.5 sm:px-2 py-1 bg-white/80 rounded border border-purple-200">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                            </svg>
                                            <span className="text-xs font-semibold text-slate-800">Copilot Autofix</span>
                                        </div>
                                        <span className="px-1.5 sm:px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">AI</span>
                                    </div>

                                    {/* Code Diff Block - Shows before/after fix */}
                                    <div className="bg-slate-900 rounded-lg p-2 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                                        <div className="flex gap-2 sm:gap-3">
                                            {/* Line numbers */}
                                            <div className="text-slate-600 select-none text-right">
                                                <div>14</div>
                                                <div className="bg-red-900/30 text-red-400">15</div>
                                                <div className="bg-green-900/30 text-green-400">15</div>
                                                <div>16</div>
                                            </div>

                                            {/* Code content */}
                                            <div className="flex-1 min-w-0">
                                                {/* Line 14: function definition */}
                                                <div className="text-slate-300">
                                                    <span className="text-purple-400">app</span>
                                                    <span className="text-slate-300">.</span>
                                                    <span className="text-blue-400">get</span>
                                                    <span className="text-yellow-300">(</span>
                                                    <span className="text-green-400">'/'</span>
                                                    <span className="text-slate-300">, (</span>
                                                    <span className="text-orange-300">req</span>
                                                    <span className="text-slate-300">, </span>
                                                    <span className="text-orange-300">res</span>
                                                    <span className="text-slate-300">) =&gt; {"{"}</span>
                                                </div>

                                                {/* Line 15 (removed): vulnerable code */}
                                                <div className="bg-red-900/20 text-slate-300 pl-2 sm:pl-4">
                                                    <span className="text-red-400">-</span>
                                                    <span className="ml-2 text-orange-300">res</span>
                                                    <span className="text-slate-300">.</span>
                                                    <span className="text-blue-400">send</span>
                                                    <span className="text-yellow-300">(</span>
                                                    <span className="text-green-400">'Hello ${"{"}</span>
                                                    <span className="text-orange-300">req</span>
                                                    <span className="text-slate-300">.</span>
                                                    <span className="text-purple-400">query</span>
                                                    <span className="text-slate-300">.</span>
                                                    <span className="text-blue-400">name</span>
                                                    <span className="text-green-400">{"}"}!'</span>
                                                    <span className="text-yellow-300">)</span>
                                                    <span className="text-slate-300">;</span>
                                                </div>

                                                {/* Line 15 (added): fixed code with escape() */}
                                                <div className="bg-green-900/20 text-slate-300 pl-2 sm:pl-4">
                                                    <span className="text-green-400">+</span>
                                                    <span className="ml-2 text-orange-300">res</span>
                                                    <span className="text-slate-300">.</span>
                                                    <span className="text-blue-400">send</span>
                                                    <span className="text-yellow-300">(</span>
                                                    <span className="text-green-400">'Hello ${"{"}</span>
                                                    <span className="text-cyan-400 bg-cyan-900/40 px-1">escape</span>
                                                    <span className="text-yellow-300">(</span>
                                                    <span className="text-orange-300">req</span>
                                                    <span className="text-slate-300">.</span>
                                                    <span className="text-purple-400">query</span>
                                                    <span className="text-slate-300">.</span>
                                                    <span className="text-blue-400">name</span>
                                                    <span className="text-yellow-300">)</span>
                                                    <span className="text-green-400">{"}"}!'</span>
                                                    <span className="text-yellow-300">)</span>
                                                    <span className="text-slate-300">;</span>
                                                </div>

                                                {/* Line 16: closing brace */}
                                                <div className="text-slate-300 pl-2 sm:pl-4">
                                                    <span>{"}"});</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
