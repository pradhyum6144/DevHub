const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { findUserById, updateUserProfile, updateUserAvatar, db } = require('./db');
const { requireAuth } = require('./auth');

const router = express.Router();

// Configure multer for avatar uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/uploads/avatars');

        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Get user profile
router.get('/', requireAuth, (req, res) => {
    try {
        const user = findUserById(req.session.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Parse social_links if it exists
        let socialLinks = null;
        if (user.social_links) {
            try {
                socialLinks = JSON.parse(user.social_links);
            } catch (e) {
                socialLinks = null;
            }
        }

        res.json({
            id: user.id,
            email: user.email,
            username: user.username,
            avatar_url: user.avatar_url,
            bio: user.bio,
            location: user.location,
            social_links: socialLinks
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Update user profile
router.put('/', requireAuth, (req, res) => {
    try {
        console.log('Profile update request received');
        console.log('Session userId:', req.session.userId);
        console.log('Request body:', req.body);

        const { username, bio, location, social_links } = req.body;

        // If username is being updated, check if it's already taken
        if (username) {
            const existingUser = db.prepare('SELECT id FROM users WHERE username = ? AND id != ?').get(username, req.session.userId);
            if (existingUser) {
                console.log('Username already taken:', username);
                return res.status(400).json({ error: 'Username already taken' });
            }
        }

        // Convert social_links object to JSON string
        const socialLinksJson = social_links ? JSON.stringify(social_links) : null;

        const updates = {
            bio: bio || null,
            location: location || null,
            social_links: socialLinksJson
        };

        // Add username to updates if provided
        if (username) {
            updates.username = username;
        }

        console.log('Updating profile with:', updates);
        updateUserProfile(req.session.userId, updates);

        const updatedUser = findUserById(req.session.userId);
        console.log('Profile updated successfully');

        // Parse social_links back to object
        let parsedSocialLinks = null;
        if (updatedUser.social_links) {
            try {
                parsedSocialLinks = JSON.parse(updatedUser.social_links);
            } catch (e) {
                parsedSocialLinks = null;
            }
        }

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                avatar_url: updatedUser.avatar_url,
                bio: updatedUser.bio,
                location: updatedUser.location,
                social_links: parsedSocialLinks
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Failed to update profile', details: error.message });
    }
});

// Upload avatar
router.post('/avatar', requireAuth, upload.single('avatar'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        updateUserAvatar(req.session.userId, avatarUrl);

        res.json({
            message: 'Avatar uploaded successfully',
            avatar_url: avatarUrl
        });
    } catch (error) {
        console.error('Error uploading avatar:', error);
        res.status(500).json({ error: 'Failed to upload avatar' });
    }
});

module.exports = router;
