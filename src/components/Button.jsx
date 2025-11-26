import React from 'react';

/**
 * Button Component
 * 
 * A reusable button component with:
 * - Multiple variants (primary, secondary, danger)
 * - Loading state support
 * - Disabled state support
 * - Consistent styling
 * 
 * This component is used across the application for all button interactions.
 */
export default function Button({
    children,              // Button text or content
    type = 'button',       // Button type (button, submit, reset)
    variant = 'primary',   // Button style variant
    loading = false,       // Whether button is in loading state
    disabled = false,      // Whether button is disabled
    onClick,               // Click handler function
    className = '',        // Additional CSS classes
    fullWidth = false      // Whether button should take full width
}) {
    // Define styles for each variant
    const variantStyles = {
        primary: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
        secondary: 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 text-white',
        danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
        outline: 'border border-white text-white hover:bg-white hover:text-slate-900'
    };

    // Get the appropriate variant style
    const variantClass = variantStyles[variant] || variantStyles.primary;

    // Determine if button should be disabled (disabled prop or loading state)
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`
                ${fullWidth ? 'w-full' : ''}
                flex justify-center items-center gap-2
                py-2.5 px-4 
                rounded-md shadow-sm 
                text-sm font-medium 
                ${variantClass}
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                transition-all 
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
        >
            {/* Loading Spinner */}
            {loading && (
                <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}

            {/* Button Content */}
            {children}
        </button>
    );
}
