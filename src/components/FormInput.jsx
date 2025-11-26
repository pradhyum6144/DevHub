import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * FormInput Component
 * 
 * A reusable input field component with:
 * - Icon support
 * - Validation error display
 * - Consistent styling
 * - Help text support
 * 
 * This component is used across all forms to maintain consistency
 * and reduce code duplication.
 */
export default function FormInput({
    label,           // Label text (e.g., "Email")
    name,            // Input name attribute
    type = 'text',   // Input type (text, email, password, etc.)
    value,           // Current input value
    onChange,        // Change handler function
    onBlur,          // Blur handler function (for validation)
    error,           // Error message to display
    touched,         // Whether field has been touched (for showing errors)
    icon: Icon,      // Icon component to display (e.g., <Mail />)
    placeholder,     // Placeholder text
    helpText,        // Help text to show below input
    required = false,// Whether field is required
    autoComplete,    // Autocomplete attribute
    disabled = false // Whether input is disabled
}) {
    // Determine if we should show the error
    const showError = error && touched;

    // Determine border color based on error state
    const borderClass = showError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500';

    return (
        <div>
            {/* Label */}
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-slate-300 mb-1"
                >
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Icon (if provided) */}
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-slate-500" />
                    </div>
                )}

                {/* Input Field */}
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        block w-full appearance-none rounded-md border
                        ${Icon ? 'pl-10' : 'pl-3'}
                        ${borderClass}
                        bg-[#0d1117] px-3 py-2 text-white 
                        placeholder-slate-500 
                        focus:outline-none focus:ring-1 
                        sm:text-sm transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                />
            </div>

            {/* Error Message */}
            {showError && (
                <div className="mt-1 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                </div>
            )}

            {/* Help Text (only show if no error) */}
            {!showError && helpText && (
                <p className="mt-1 text-xs text-slate-500">
                    {helpText}
                </p>
            )}
        </div>
    );
}
