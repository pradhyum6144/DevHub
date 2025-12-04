const express = require('express');
const bcrypt = require('bcryptjs');
const { findUserByEmail, findUserByUsername, findUserById, createUser } = require('./db');
const jwt = require('jsonwebtoken');

const router = express.Router();

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this-in-production');
            req.userId = decoded.userId;
            return next();
        } catch (error) {
            console.log('JWT verification failed:', error.message);
        }
    }

    console.log('Session check:', {
        hasSession: !!req.session,
        userId: req.session?.userId,
        sessionID: req.sessionID
    });

    if (!req.session.userId) {
        console.log('Authentication failed: No userId in session or valid token');
        return res.status(401).json({ error: 'Not authenticated' });
    }

    req.userId = req.session.userId;
    next();
}

router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (findUserByEmail(email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    if (findUserByUsername(username)) {
        return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userId = createUser(email, username, hashedPassword);
        const user = findUserById(userId);

        req.session.userId = userId;

        const token = jwt.sign(
            { userId: userId },
            process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
            { expiresIn: '7d' }
        );

        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ error: 'Session creation failed' });
            }
            res.json({
                token,
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = findUserByEmail(email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    req.session.userId = user.id;

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
        { expiresIn: '7d' }
    );

    req.session.save((err) => {
        if (err) {
            return res.status(500).json({ error: 'Login failed' });
        }
        res.json({
            token,
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

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

router.get('/verify', (req, res) => {
    let userId = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this-in-production');
            userId = decoded.userId;
        } catch (error) {
            console.log('JWT verification failed:', error.message);
        }
    }

    if (!userId && req.session.userId) {
        userId = req.session.userId;
    }

    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = findUserById(userId);

    if (!user) {
        if (req.session.userId) {
            req.session.destroy();
        }
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
