// Load variables from .env (PORT, secrets, frontend URL, etc.)
require('dotenv').config();

// Import dependencies
const express = require('express');          // Web server framework
const cors = require('cors');                // Handle cross-origin requests
const session = require('express-session');  // Store user login session
const SqliteStore = require('better-sqlite3-session-store')(session); // Session DB store
const Database = require('better-sqlite3');  // SQLite database
const authRoutes = require('./auth');        // Auth APIs
const profileRoutes = require('./profile');  // Profile APIs
const historyRoutes = require('./history');  // History APIs
const chatbotRoutes = require('./chatbot');  // Chatbot APIs
const path = require('path');                // For file paths

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- CORS --------------------
// Allows frontend (localhost:5173 or deployed site) to access backend
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            process.env.FRONTEND_URL
        ].filter(Boolean);

        // Check if origin is allowed
        if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS')); // Block unknown origins
        }
    },
    credentials: true // Allow session cookies to be sent
}));

// Parse JSON bodies from frontend
app.use(express.json());

// -------------------- SESSION --------------------
// Store sessions (logins) inside SQLite database
const db = new Database(path.join(__dirname, 'devhub.db'));

app.use(session({
    store: new SqliteStore({
        client: db,
        expired: { clear: true, intervalMs: 900000 } // Clear expired sessions
    }),
    secret: process.env.SESSION_SECRET || 'your-session-secret', // Encrypt session
    resave: false,                  // Do not save unchanged sessions
    saveUninitialized: false,       // Do not create empty sessions
    cookie: {
        secure: false,              // true only if using HTTPS
        httpOnly: true,             // Prevent JS from accessing cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, // Valid for 7 days
        sameSite: 'lax'             // Helps cookies work across localhost
    }
}));

// Serve static image files (profile images)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// -------------------- ROUTES --------------------
// Each route file handles a group of APIs
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Simple endpoint to check if server is running
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
