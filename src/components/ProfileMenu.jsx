import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Settings, LogOut, User } from 'lucide-react';

export default function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getAvatarDisplay = () => {
        if (user?.avatar_url) {
            return (
                <img
                    src={`http://localhost:5000${user.avatar_url}`}
                    alt={user.username}
                    className="profile-avatar-img"
                />
            );
        }
        return (
            <div className="profile-avatar-default">
                <User size={20} />
            </div>
        );
    };

    return (
        <div className="profile-menu" ref={dropdownRef}>
            <button
                className="profile-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                {getAvatarDisplay()}
            </button>

            {isOpen && (
                <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                        <div className="profile-dropdown-avatar">
                            {getAvatarDisplay()}
                        </div>
                        <div className="profile-dropdown-info">
                            <div className="profile-dropdown-username">{user?.username || 'User'}</div>
                            <div className="profile-dropdown-email">{user?.email}</div>
                        </div>
                    </div>

                    <div className="profile-dropdown-divider" />

                    <div className="profile-dropdown-menu">
                        <Link
                            to="/settings/profile"
                            className="profile-dropdown-item"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings size={16} />
                            <span>Settings</span>
                        </Link>
                        <button
                            className="profile-dropdown-item"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
