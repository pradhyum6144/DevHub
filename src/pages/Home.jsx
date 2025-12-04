import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import the simplified components
import HeroSection from '../components/HeroSection';
import SecuritySection from '../components/SecuritySection';
import WorkflowSection from '../components/WorkflowSection';
import FooterCTA from '../components/FooterCTA';

/**
 * Home Page Component
 * 
 * This is the main landing page for DevHub.
 * It's been simplified by breaking down the large sections into smaller,
 * reusable components for better code organization and readability.
 * 
 * Structure:
 * 1. HeroSection - Main landing area with email signup
 * 2. SecuritySection - Showcases AI-powered security features
 * 3. WorkflowSection - Displays workflow acceleration capabilities
 * 4. FooterCTA - Final call-to-action with community messaging
 */
export default function Home() {
    // State for email inputs (separate for hero and footer sections)
    const [heroEmail, setHeroEmail] = useState('');
    const [footerEmail, setFooterEmail] = useState('');
    const navigate = useNavigate();

    /**
     * Handle signup button clicks
     * Validates email and navigates to signup page with email pre-filled
     */
    const handleSignup = (email) => {
        // Basic email validation
        if (!email || !email.includes('@')) {
            return;
        }
        // Navigate to signup page with email as query parameter
        navigate(`/signup?email=${encodeURIComponent(email)}`);
    };

    return (
        <div className="bg-[#0d1117] text-white overflow-hidden">
            {/* Hero Section - Main landing area */}
            <HeroSection
                email={heroEmail}
                onEmailChange={setHeroEmail}
                onSignup={handleSignup}
            />

            {/* Footer CTA - Final call-to-action */}
            <FooterCTA
                email={footerEmail}
                onEmailChange={setFooterEmail}
                onSignup={handleSignup}
            />
        </div>
    );
}
