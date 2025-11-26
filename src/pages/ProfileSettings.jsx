import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Upload, User, Edit2, X } from 'lucide-react';

export default function ProfileSettings() {
    const { user, refreshUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        location: '',
        instagram: '',
        linkedin: '',
        github: '',
        website: ''
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        // Check if user is authenticated
        if (!user && !loading) {
            setMessage({ type: 'error', text: 'Please log in to access profile settings' });
            setTimeout(() => navigate('/login'), 2000);
            return;
        }
        fetchProfile();
    }, [user, loading]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`${API_URL}/api/profile`, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setFormData({
                    username: data.username || '',
                    bio: data.bio || '',
                    location: data.location || '',
                    instagram: data.social_links?.instagram || '',
                    linkedin: data.social_links?.linkedin || '',
                    github: data.social_links?.github || '',
                    website: data.social_links?.website || ''
                });
                if (data.avatar_url) {
                    setAvatarPreview(`${API_URL}${data.avatar_url}`);
                }
            } else if (response.status === 401) {
                setMessage({ type: 'error', text: 'Session expired. Please log in again.' });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage({ type: 'error', text: 'Failed to load profile' });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setMessage({ type: 'error', text: 'Failed to load profile' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload
        const formDataUpload = new FormData();
        formDataUpload.append('avatar', file);

        try {
            const response = await fetch(`${API_URL}/api/profile/avatar`, {
                method: 'POST',
                credentials: 'include',
                body: formDataUpload
            });

            if (response.ok) {
                const data = await response.json();
                setMessage({ type: 'success', text: 'Avatar updated successfully!' });
                // Refresh user data in context
                await refreshUser();
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } else {
                setMessage({ type: 'error', text: 'Failed to upload avatar' });
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            setMessage({ type: 'error', text: 'Failed to upload avatar' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch(`${API_URL}/api/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: formData.username,
                    bio: formData.bio,
                    location: formData.location,
                    social_links: {
                        instagram: formData.instagram,
                        linkedin: formData.linkedin,
                        github: formData.github,
                        website: formData.website
                    }
                })
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                // Refresh user data in context to update profile menu
                await refreshUser();
                setIsEditing(false); // Exit edit mode
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } else {
                const data = await response.json();
                setMessage({ type: 'error', text: data.error || 'Failed to update profile' });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', text: 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        fetchProfile(); // Reload original data
        setIsEditing(false);
        setMessage({ type: '', text: '' });
    };

    return (
        <div className="profile-settings-container">
            <div className="profile-settings-header">
                <button className="back-button" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft size={20} />
                    <span>Back to Dashboard</span>
                </button>
                <h1>Profile Settings</h1>
            </div>

            <div className="profile-settings-content">
                <div className="profile-avatar-section">
                    <div className="avatar-upload-container">
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Avatar" className="avatar-preview" />
                        ) : (
                            <div className="avatar-preview-default">
                                <User size={48} />
                            </div>
                        )}
                        <label className="avatar-upload-label">
                            <Upload size={16} />
                            <span>Change Avatar</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="avatar-upload-input"
                            />
                        </label>
                    </div>
                    <div className="avatar-info">
                        <h3>{formData.username || 'User'}</h3>
                        <p>{user?.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    {message.text && (
                        <div className={`profile-message ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">Display Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Your display name"
                            disabled={!isEditing}
                            required
                        />
                        <small className="form-help">This is how your name will appear across DevHub</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Tell us about yourself..."
                            disabled={!isEditing}
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., San Francisco, CA"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-section-title">Social Accounts</div>

                    <div className="form-group">
                        <label htmlFor="instagram">Instagram</label>
                        <input
                            type="text"
                            id="instagram"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            placeholder="https://instagram.com/username"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/username"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="github">GitHub</label>
                        <input
                            type="text"
                            id="github"
                            name="github"
                            value={formData.github}
                            onChange={handleInputChange}
                            placeholder="https://github.com/username"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://yourwebsite.com"
                            disabled={!isEditing}
                        />
                    </div>

                    {!isEditing ? (
                        <button type="button" onClick={() => setIsEditing(true)} className="edit-button">
                            <Edit2 size={16} />
                            <span>Edit Profile</span>
                        </button>
                    ) : (
                        <div className="button-group">
                            <button type="submit" className="save-button" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button type="button" onClick={handleCancel} className="cancel-button" disabled={loading}>
                                <X size={16} />
                                <span>Cancel</span>
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
