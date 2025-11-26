/**
 * Form Validation Utilities
 * 
 * This file contains all validation functions used across the application.
 * Each function takes an input value and returns an error message string.
 * If validation passes, it returns an empty string.
 */

/**
 * Validate email address
 * 
 * Rules:
 * - Cannot be empty
 * - Must match standard email format (user@domain.com)
 * 
 * @param {string} email - Email address to validate
 * @returns {string} Error message or empty string if valid
 */
export function validateEmail(email) {
    // Check if email is empty
    if (!email.trim()) {
        return 'Email cannot be blank';
    }

    // Check if email matches standard format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }

    return ''; // No error
}

/**
 * Validate password
 * 
 * Rules:
 * - Cannot be empty
 * - Must be at least 8 characters long
 * 
 * @param {string} password - Password to validate
 * @returns {string} Error message or empty string if valid
 */
export function validatePassword(password) {
    // Check if password is empty
    if (!password) {
        return 'Password cannot be blank';
    }

    // Check minimum length
    if (password.length < 8) {
        return 'Password should be at least 8 characters including a number and a lowercase letter';
    }

    return ''; // No error
}

/**
 * Validate username
 * 
 * Rules:
 * - Cannot be empty
 * - Must be at least 3 characters
 * - Can only contain letters, numbers, hyphens, and underscores
 * - Cannot start or end with a hyphen
 * 
 * @param {string} username - Username to validate
 * @returns {string} Error message or empty string if valid
 */
export function validateUsername(username) {
    // Check if username is empty
    if (!username.trim()) {
        return 'Username cannot be blank';
    }

    // Check minimum length
    if (username.length < 3) {
        return 'Username must be at least 3 characters';
    }

    // Check allowed characters (alphanumeric, hyphens, underscores)
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        return 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen';
    }

    return ''; // No error
}

/**
 * Validate all form fields at once
 * 
 * @param {Object} formData - Object containing form field values
 * @returns {Object} Object with error messages for each field
 */
export function validateSignupForm(formData) {
    return {
        email: validateEmail(formData.email || ''),
        password: validatePassword(formData.password || ''),
        username: validateUsername(formData.username || '')
    };
}

/**
 * Check if form has any errors
 * 
 * @param {Object} errors - Object containing error messages
 * @returns {boolean} True if there are any errors
 */
export function hasErrors(errors) {
    return Object.values(errors).some(error => error !== '');
}
