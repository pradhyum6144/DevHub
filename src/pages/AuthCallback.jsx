import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { verifyAndSetToken } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            // Store token and verify it
            localStorage.setItem('token', token);

            // Verify token to get user data
            fetch('http://localhost:5000/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        // Manually set user in context (we'll add this function)
                        window.location.href = '/';
                    } else {
                        navigate('/login');
                    }
                })
                .catch(() => {
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
            <div className="text-white text-xl">Completing sign in...</div>
        </div>
    );
}
