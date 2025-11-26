const express = require('express');
const bcrypt = require('bcryptjs');
const { findUserByEmail, findUserByUsername, findUserById, createUser } = require('./db');

const router = express.Router();

// Middleware to check if user is authenticated
function requireAuth(req, res, next) {
    console.log('Session check:', {
        hasSession: !!req.session,
        userId: req.session?.userId,
        sessionID: req.sessionID
    });

    if (!req.session.userId) {
        console.log('Authentication failed: No userId in session');
        return res.status(401).json({ error: 'Not authenticated' });
    }
    next();
}

// Sign up route
router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;

    // Validate input
    if (!email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    if (findUserByUsername(username)) {
        return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    try {
        const userId = createUser(email, username, hashedPassword);
        const user = findUserById(userId);

        // Create session
        req.session.userId = userId;

        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ error: 'Session creation failed' });
            }
            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    avatar_url: user.avatar_url,
                    bio: user.bio,
                    location: user.location
                }
            });
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Signup failed' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = findUserByEmail(email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create session
    req.session.userId = user.id;

    req.session.save((err) => {
        if (err) {
            return res.status(500).json({ error: 'Login failed' });
        }
        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                avatar_url: user.avatar_url,
                bio: user.bio,
                location: user.location
            }
        });
    });
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Verify session route
router.get('/verify', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = findUserById(req.session.userId);

    if (!user) {
        req.session.destroy();
        return res.status(401).json({ error: 'User not found' });
    }

    res.json({
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            avatar_url: user.avatar_url,
            bio: user.bio,
            location: user.location
        }
    });
});

module.exports = router;
module.exports.requireAuth = requireAuth;
