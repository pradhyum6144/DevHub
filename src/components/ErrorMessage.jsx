import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * ErrorMessage Component
 * 
 * A reusable message display component for:
 * - Error messages (red)
 * - Success messages (green)
 * - Info messages (blue)
 * - Warning messages (yellow)
 * 
 * Provides consistent styling and icons for all message types.
 */
export default function ErrorMessage({
    message,           // Message text to display
    type = 'error',    // Message type (error, success, info, warning)
    className = ''     // Additional CSS classes
}) {
    // Don't render if no message
    if (!message) return null;

    // Define styles and icons for each message type
    const messageConfig = {
        error: {
            bgColor: 'bg-red-900/20',
            borderColor: 'border-red-500/50',
            textColor: 'text-red-400',
            Icon: AlertCircle
        },
        success: {
            bgColor: 'bg-green-900/20',
            borderColor: 'border-green-500/50',
            textColor: 'text-green-400',
            Icon: CheckCircle
        },
        info: {
            bgColor: 'bg-blue-900/20',
            borderColor: 'border-blue-500/50',
            textColor: 'text-blue-400',
            Icon: Info
        },
        warning: {
            bgColor: 'bg-yellow-900/20',
            borderColor: 'border-yellow-500/50',
            textColor: 'text-yellow-400',
            Icon: AlertTriangle
        }
    };

    // Get configuration for the specified type
    const config = messageConfig[type] || messageConfig.error;
    const Icon = config.Icon;

    return (
        <div
            className={`
                p-3 rounded-md border
                ${config.bgColor}
                ${config.borderColor}
                ${className}
            `}
        >
            <div className={`flex items-center gap-2 text-sm ${config.textColor}`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{message}</span>
            </div>
        </div>
    );
}
