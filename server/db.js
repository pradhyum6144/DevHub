const Database = require('better-sqlite3');
const path = require('path');

// Create or open database
const db = new Database(path.join(__dirname, 'devhub.db'));

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    social_links TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Migration: Add profile columns if they don't exist (for existing databases)
try {
    // Check if bio column exists
    const tableInfo = db.prepare("PRAGMA table_info(users)").all();
    const columnNames = tableInfo.map(col => col.name);

    // Add missing columns
    if (!columnNames.includes('bio')) {
        console.log('Adding bio column to users table...');
        db.exec('ALTER TABLE users ADD COLUMN bio TEXT');
    }
    if (!columnNames.includes('location')) {
        console.log('Adding location column to users table...');
        db.exec('ALTER TABLE users ADD COLUMN location TEXT');
    }
    if (!columnNames.includes('social_links')) {
        console.log('Adding social_links column to users table...');
        db.exec('ALTER TABLE users ADD COLUMN social_links TEXT');
    }
    if (!columnNames.includes('avatar_url')) {
        console.log('Adding avatar_url column to users table...');
        db.exec('ALTER TABLE users ADD COLUMN avatar_url TEXT');
    }
    console.log('Database schema migration completed successfully');
} catch (error) {
    console.error('Error during database migration:', error);
}


// Create navigation history table
db.exec(`
  CREATE TABLE IF NOT EXISTS navigation_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_type TEXT NOT NULL,
    item_name TEXT NOT NULL,
    item_url TEXT,
    visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Create chat messages table
db.exec(`
  CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Database operations
module.exports = {
    db, // Export db instance for direct queries

    // Find user by email
    findUserByEmail: (email) => {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        return stmt.get(email);
    },

    // Find user by username
    findUserByUsername: (username) => {
        const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
        return stmt.get(username);
    },

    // Find user by ID
    findUserById: (id) => {
        const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
        return stmt.get(id);
    },

    // Create new user
    createUser: (email, username, hashedPassword) => {
        const stmt = db.prepare(
            'INSERT INTO users (email, username, password) VALUES (?, ?, ?)'
        );
        const result = stmt.run(email, username, hashedPassword);
        return result.lastInsertRowid;
    },

    // Update user profile
    updateUserProfile: (userId, profileData) => {
        const fields = [];
        const values = [];

        // Dynamically build UPDATE query based on provided fields
        if (profileData.username !== undefined) {
            fields.push('username = ?');
            values.push(profileData.username);
        }
        if (profileData.bio !== undefined) {
            fields.push('bio = ?');
            values.push(profileData.bio);
        }
        if (profileData.location !== undefined) {
            fields.push('location = ?');
            values.push(profileData.location);
        }
        if (profileData.social_links !== undefined) {
            fields.push('social_links = ?');
            values.push(profileData.social_links);
        }

        if (fields.length === 0) return;

        values.push(userId);
        const stmt = db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`);
        return stmt.run(...values);
    },

    // Update user avatar
    updateUserAvatar: (userId, avatarUrl) => {
        const stmt = db.prepare('UPDATE users SET avatar_url = ? WHERE id = ?');
        return stmt.run(avatarUrl, userId);
    },

    // Add navigation history entry
    addNavigationHistory: (userId, itemType, itemName, itemUrl) => {
        const stmt = db.prepare(
            'INSERT INTO navigation_history (user_id, item_type, item_name, item_url) VALUES (?, ?, ?, ?)'
        );
        return stmt.run(userId, itemType, itemName, itemUrl);
    },

    // Get navigation history for a user
    getNavigationHistory: (userId, limit = 10) => {
        const stmt = db.prepare(
            'SELECT * FROM navigation_history WHERE user_id = ? ORDER BY visited_at DESC LIMIT ?'
        );
        return stmt.all(userId, limit);
    },

    // Save chat message
    saveChatMessage: (userId, message, response) => {
        const stmt = db.prepare(
            'INSERT INTO chat_messages (user_id, message, response) VALUES (?, ?, ?)'
        );
        return stmt.run(userId, message, response);
    },

    // Get chat history for a user
    getChatHistory: (userId, limit = 20) => {
        const stmt = db.prepare(
            'SELECT * FROM chat_messages WHERE user_id = ? ORDER BY created_at DESC LIMIT ?'
        );
        return stmt.all(userId, limit);
    }
};
