// Express router
const express = require('express');
const multer = require('multer');                 // Handles file uploads (avatars)
const path = require('path');                     // Helps build correct file paths
const fs = require('fs');                         // Used to check/create upload folders
const { findUserById, updateUserProfile, updateUserAvatar, db } = require('./db');
const { requireAuth } = require('./auth');        // Protect routes (must be logged in)

const router = express.Router();

// -------------------- MULTER STORAGE SETUP --------------------
// Controls where files are stored and how they are named

const storage = multer.diskStorage({

    // Set folder where avatars will be saved

    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/uploads/avatars');

        // If folder does NOT exist → create it

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir); // Tell multer to save file here
    },

    // Rename file to ensure each avatar gets a unique name
    
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Multer configuration: where to store, size limit, allowed file types
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max size = 5MB
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/; // Allowed extensions
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype); // Check real MIME type

        // Only allow the upload if file is an image
        if (mimetype && extname) cb(null, true);
        else cb(new Error('Only image files are allowed!'));
    }
});

// -------------------- GET PROFILE --------------------
// Returns currently logged-in user's profile data
router.get('/', requireAuth, (req, res) => {
    try {
        // Fetch user by session userId
        const user = findUserById(req.session.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Convert stored JSON string → object
        let socialLinks = null;
        if (user.social_links) {
            try {
                socialLinks = JSON.parse(user.social_links);
            } catch {
                socialLinks = null; // If invalid JSON, ignore it
            }
        }

        // Send cleaned user data to frontend
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

// -------------------- UPDATE PROFILE --------------------
// Allows user to change username, bio, location, social links
router.put('/', requireAuth, (req, res) => {
    try {
        const { username, bio, location, social_links } = req.body;

        // If username is changing → verify it's not taken by someone else
        if (username) {
            const existingUser = db.prepare(
                'SELECT id FROM users WHERE username = ? AND id != ?'
            ).get(username, req.session.userId);

            if (existingUser) {
                return res.status(400).json({ error: 'Username already taken' });
            }
        }

        // Convert social links object → JSON string for DB
        const socialLinksJson = social_links ? JSON.stringify(social_links) : null;

        // Build update object
        const updates = {
            bio: bio || null,
            location: location || null,
            social_links: socialLinksJson
        };

        // Add username if included
        if (username) updates.username = username;

        // Perform update in database
        updateUserProfile(req.session.userId, updates);

        // Fetch the updated user from database
        const updatedUser = findUserById(req.session.userId);

        // Convert stored JSON string → object
        let parsedSocialLinks = null;
        if (updatedUser.social_links) {
            try {
                parsedSocialLinks = JSON.parse(updatedUser.social_links);
            } catch {
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
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// -------------------- UPLOAD AVATAR --------------------
// Saves uploaded avatar and updates the user's avatar_url
router.post('/avatar', requireAuth, upload.single('avatar'), (req, res) => {
    try {
        // If no file is sent
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Build the URL where the image will be accessible
        const avatarUrl = `/uploads/avatars/${req.file.filename}`;

        // Save new avatar URL in database
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

// Export router so it can be used in main server file
module.exports = router;
