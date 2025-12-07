import React from 'react';

/**
 * WorkflowSection - Showcases AI-powered workflow acceleration
 * 
 * Features:
 * - Displays DevHub Copilot AI capabilities
 * - Lists 4 key features
 * - Interactive buttons (regenerate, thumbs up/down)
 * - Deploy and Review action buttons
 */
export default function WorkflowSection() {
    return (
        <section className="relative py-16 sm:py-20 md:py-24 bg-[#0d1117]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Section Header */}
                <div className="mb-10 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
                        Accelerate your entire workflow
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto px-4">
                        From your first line of code to final deployment, DevHub provides
                        AI and automation tools to help you build and ship better
                        software faster.
                    </p>
                </div>

                {/* AI Assistant Card */}
                <div className="mt-12 sm:mt-16 flex justify-center">
                    <div className="relative max-w-3xl w-full">
                        {/* Purple Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-purple-600/30 rounded-full blur-[100px] sm:blur-[120px] animate-pulse" />

                        {/* Card Container */}
                        <div className="relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-2xl">
                            <div className="text-left space-y-4 sm:space-y-6">
                                {/* Card Header - AI Status */}
                                <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                                            DevHub Gemini AI
                                        </h3>
                                        <p className="text-slate-400 text-xs sm:text-sm">
                                            The AI-powered development assistant is now fully integrated. Developers can:
                                        </p>
                                    </div>
                                </div>

                                {/* Feature List - 4 key capabilities */}
                                <div className="pl-6 sm:pl-9 space-y-2 sm:space-y-3 text-slate-300">
                                    <div className="flex items-start gap-2">
                                        <span className="text-slate-500 font-mono text-xs sm:text-sm">1.</span>
                                        <p className="text-xs sm:text-sm">Write code faster with intelligent autocomplete and suggestions</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-slate-500 font-mono text-xs sm:text-sm">2.</span>
                                        <p className="text-xs sm:text-sm">Get instant code reviews and security vulnerability detection</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-slate-500 font-mono text-xs sm:text-sm">3.</span>
                                        <p className="text-xs sm:text-sm">Generate tests and documentation automatically</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-slate-500 font-mono text-xs sm:text-sm">4.</span>
                                        <p className="text-xs sm:text-sm">Deploy with confidence using AI-powered CI/CD pipelines</p>
                                    </div>
                                </div>

                                {/* Interaction Section - Feedback buttons */}
                                <div className="pt-4 sm:pt-6 border-t border-white/10">
                                    <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
                                        Is there anything specific about the implementation you'd like
                                        to explore or would you like to see it in action?
                                    </p>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        {/* Regenerate button */}
                                        <button className="p-1.5 sm:p-2 hover:bg-white/5 rounded transition-colors">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </button>
                                        {/* Thumbs up button */}
                                        <button className="p-1.5 sm:p-2 hover:bg-white/5 rounded transition-colors">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                            </svg>
                                        </button>
                                        {/* Thumbs down button */}
                                        <button className="p-1.5 sm:p-2 hover:bg-white/5 rounded transition-colors">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons Section */}
                                <div className="pt-3 sm:pt-4 border-t border-white/10">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
                                        {/* File info */}
                                        <div className="flex items-center gap-2 overflow-x-auto">
                                            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 flex-shrink-0">TS</span>
                                            <span className="whitespace-nowrap">+workflow.ts</span>
                                            <span className="text-slate-600 hidden sm:inline">src/automation</span>
                                        </div>
                                        {/* Action buttons */}
                                        <div className="flex items-center gap-2">
                                            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                                                Deploy
                                            </button>
                                            <button className="px-3 py-1 border border-slate-600 hover:border-slate-500 text-slate-300 rounded text-xs font-medium transition-colors">
                                                Review
                                            </button>
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
