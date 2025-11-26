# DevHub - Complete Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Database](#database)
5. [Backend API](#backend-api)
6. [Frontend](#frontend)
7. [Authentication](#authentication)
8. [Environment Variables](#environment-variables)
9. [Installation & Setup](#installation--setup)
10. [API Reference](#api-reference)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

**DevHub** is a modern web application for developers featuring:
- User authentication (email/password + Google OAuth)
- User profiles with avatars and social links
- AI-powered chatbot assistant
- Navigation history tracking
- Responsive design with dark theme

**Architecture**: Full-stack JavaScript application with React frontend and Node.js/Express backend

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library for building components |
| **React Router DOM** | 6.28.0 | Client-side routing |
| **Vite** | 5.4.21 | Build tool and dev server |
| **Tailwind CSS** | 3.4.15 | Utility-first CSS framework |
| **Lucide React** | 0.460.0 | Icon library |
| **PostCSS** | 8.4.49 | CSS processing |
| **Autoprefixer** | 10.4.20 | CSS vendor prefixing |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | JavaScript runtime |
| **Express** | 4.18.2 | Web framework |
| **Better-SQLite3** | 9.2.2 | SQLite database driver |
| **Express-Session** | 1.18.2 | Session management |
| **bcryptjs** | 2.4.3 | Password hashing |
| **jsonwebtoken** | 9.0.2 | JWT token generation |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Multer** | 2.0.2 | File upload handling |
| **OpenAI** | 6.9.1 | AI chatbot integration |
| **Passport** | 0.7.0 | Authentication middleware |
| **Passport-Google-OAuth20** | 2.0.0 | Google OAuth strategy |
| **dotenv** | 16.3.1 | Environment variable management |

### Database
| Technology | Purpose |
|------------|---------|
| **SQLite** | Lightweight file-based relational database |
| **Better-SQLite3-Session-Store** | Persistent session storage |

---

## Project Structure

```
/home/pradhyum/project /Home page/
├── src/                          # Frontend source code
│   ├── components/               # Reusable React components
│   │   ├── Button.jsx           # Reusable button component
│   │   ├── ErrorMessage.jsx     # Message display component
│   │   ├── FormInput.jsx        # Form input with validation
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Footer.jsx           # Page footer
│   │   ├── Layout.jsx           # Page layout wrapper
│   │   ├── ProtectedRoute.jsx   # Auth guard for routes
│   │   ├── ProfileMenu.jsx      # User profile dropdown
│   │   ├── Chatbot.jsx          # AI chatbot interface
│   │   ├── HeroSection.jsx      # Home page hero
│   │   ├── SecuritySection.jsx  # Security features section
│   │   ├── WorkflowSection.jsx  # Workflow features section
│   │   ├── FooterCTA.jsx        # Call-to-action footer
│   │   ├── Sidebar.jsx          # Dashboard sidebar
│   │   ├── NavigationHistory.jsx # Recent navigation
│   │   └── ThemeToggle.jsx      # Dark/light theme toggle
│   ├── pages/                    # Page components
│   │   ├── Home.jsx             # Landing page
│   │   ├── Login.jsx            # Login page
│   │   ├── SignUp.jsx           # Registration page
│   │   ├── Dashboard.jsx        # User dashboard
│   │   ├── ProfileSettings.jsx  # Profile management
│   │   ├── Docs.jsx             # Documentation page
│   │   └── AuthCallback.jsx     # OAuth callback handler
│   ├── context/                  # React context providers
│   │   └── AuthContext.jsx      # Authentication state
│   ├── utils/                    # Utility functions
│   │   ├── validation.js        # Form validation
│   │   ├── constants.js         # App constants
│   │   ├── helpers.js           # Helper functions
│   │   └── navigationTracker.js # Navigation tracking
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles
├── server/                       # Backend source code
│   ├── index.js                 # Server entry point
│   ├── auth.js                  # Authentication routes
│   ├── profile.js               # Profile routes
│   ├── chatbot.js               # Chatbot routes
│   ├── history.js               # Navigation history routes
│   ├── db.js                    # Database operations
│   ├── middleware.js            # Custom middleware
│   ├── devhub.db                # SQLite database file
│   ├── package.json             # Backend dependencies
│   └── .env                     # Backend environment variables
├── public/                       # Static assets
│   └── uploads/                 # User uploaded files
│       └── avatars/             # User avatar images
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── index.html                   # HTML template
└── .env                         # Frontend environment variables
```

---

## Database

### Database Type
**SQLite** - A lightweight, file-based relational database stored in `server/devhub.db`

### Why SQLite?
- ✅ No separate database server required
- ✅ Zero configuration
- ✅ Perfect for development and small-to-medium applications
- ✅ ACID compliant
- ✅ Fast and efficient

### Database Schema

#### 1. `users` Table
Stores user account information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique user ID |
| `email` | TEXT | UNIQUE, NOT NULL | User email address |
| `username` | TEXT | UNIQUE, NOT NULL | Display name |
| `password` | TEXT | NOT NULL | Hashed password (bcrypt) |
| `avatar_url` | TEXT | NULL | Path to avatar image |
| `bio` | TEXT | NULL | User biography |
| `location` | TEXT | NULL | User location |
| `social_links` | TEXT | NULL | JSON string of social media links |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Account creation date |

**Indexes**:
- Unique index on `email`
- Unique index on `username`

#### 2. `sessions` Table
Stores user session data (managed by better-sqlite3-session-store).

| Column | Type | Description |
|--------|------|-------------|
| `sid` | TEXT | Session ID (PRIMARY KEY) |
| `sess` | TEXT | Session data (JSON) |
| `expired` | INTEGER | Expiration timestamp |

#### 3. `navigation_history` Table
Tracks user navigation for recent activity.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | History entry ID |
| `user_id` | INTEGER | NOT NULL, FOREIGN KEY | References users(id) |
| `item_type` | TEXT | NOT NULL | Type of item (e.g., "repository") |
| `item_name` | TEXT | NOT NULL | Name of item |
| `item_url` | TEXT | NULL | URL to item |
| `visited_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Visit timestamp |

#### 4. `chat_messages` Table
Stores chatbot conversation history.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Message ID |
| `user_id` | INTEGER | NOT NULL, FOREIGN KEY | References users(id) |
| `message` | TEXT | NOT NULL | User's message |
| `response` | TEXT | NOT NULL | Bot's response |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Message timestamp |

### Database Location
```
/home/pradhyum/project /Home page/server/devhub.db
```

### Database Operations
All database operations are centralized in `server/db.js`:
- `findUserByEmail(email)` - Find user by email
- `findUserByUsername(username)` - Find user by username
- `findUserById(id)` - Find user by ID
- `createUser(email, username, hashedPassword)` - Create new user
- `updateUserProfile(userId, profileData)` - Update user profile
- `updateUserAvatar(userId, avatarUrl)` - Update avatar
- `addNavigationHistory(userId, itemType, itemName, itemUrl)` - Add history entry
- `getNavigationHistory(userId, limit)` - Get user's navigation history
- `saveChatMessage(userId, message, response)` - Save chat message
- `getChatHistory(userId, limit)` - Get chat history

---

## Backend API

### Server Configuration

**Port**: 5000 (configurable via `PORT` environment variable)  
**Base URL**: `http://localhost:5000`

### Middleware Stack

1. **CORS** - Allows cross-origin requests from frontend
   - Allowed origins: `http://localhost:5173`, `http://127.0.0.1:5173`
   - Credentials: enabled (for cookies)

2. **Body Parser** - Parses JSON request bodies
   - `express.json()`

3. **Session Management** - Persistent sessions with SQLite
   - Store: `better-sqlite3-session-store`
   - Secret: From `SESSION_SECRET` env variable
   - Cookie settings:
     - `httpOnly`: true (prevents XSS)
     - `secure`: false (set to true in production with HTTPS)
     - `maxAge`: 7 days
     - `sameSite`: 'lax'

4. **Static Files** - Serves uploaded avatars
   - Route: `/uploads`
   - Directory: `public/uploads`

### API Routes

#### Authentication Routes (`/api/auth`)
Defined in `server/auth.js`

#### Profile Routes (`/api/profile`)
Defined in `server/profile.js`

#### Navigation History Routes (`/api/history`)
Defined in `server/history.js`

#### Chatbot Routes (`/api/chatbot`)
Defined in `server/chatbot.js`

---

## Frontend

### Build Tool: Vite

**Why Vite?**
- ⚡ Lightning-fast hot module replacement (HMR)
- 📦 Optimized production builds
- 🔧 Simple configuration
- 🎯 Native ES modules support

**Configuration**: `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### Styling: Tailwind CSS

**Configuration**: `tailwind.config.js`
- Custom colors for dark theme
- Extended spacing and animations
- Custom utilities

**Features Used**:
- Utility classes for rapid development
- Dark mode support
- Responsive design utilities
- Custom animations (pulse, spin)

### State Management

**React Context API** - Used for global state:
- `AuthContext` - User authentication state
  - `user` - Current user object
  - `login()` - Login function
  - `signup()` - Signup function
  - `logout()` - Logout function
  - `loading` - Session verification status
  - `refreshUser()` - Refresh user data
  - `updateUser()` - Update user in context

### Routing

**React Router DOM v6** - Client-side routing

**Routes**:
- `/` - Home page (public)
- `/login` - Login page (public)
- `/signup` - Signup page (public)
- `/docs` - Documentation (public)
- `/auth/callback` - OAuth callback (public)
- `/dashboard` - User dashboard (protected)
- `/settings/profile` - Profile settings (protected)

**Protected Routes**:
- Wrapped with `<ProtectedRoute>` component
- Redirects to `/login` if not authenticated
- Shows loading spinner during auth check

### Component Architecture

#### Reusable Components

1. **FormInput** - Standardized form input
   - Props: label, name, type, value, onChange, error, icon, etc.
   - Features: Validation display, icons, help text

2. **Button** - Standardized button
   - Props: variant, loading, disabled, onClick, etc.
   - Variants: primary, secondary, danger, outline

3. **ErrorMessage** - Standardized message display
   - Props: message, type
   - Types: error, success, info, warning

#### Page Components

- **Home** - Landing page with hero, features, and CTAs
- **Login** - Email/password login form
- **SignUp** - User registration form
- **Dashboard** - User dashboard (simplified for teammate)
- **ProfileSettings** - Profile management with avatar upload
- **Docs** - Documentation and guides

#### Layout Components

- **Layout** - Page wrapper with navbar and footer
- **Navbar** - Top navigation with mobile menu
- **Footer** - Page footer with links
- **ProtectedRoute** - Authentication guard

### Utility Files

1. **validation.js** - Form validation functions
2. **constants.js** - Application constants
3. **helpers.js** - Helper functions
4. **navigationTracker.js** - Navigation tracking

---

## Authentication

### Authentication Flow

#### Session-Based Authentication

1. **User Registration**:
   ```
   User → POST /api/auth/signup → Server validates → Hash password → 
   Create user → Create session → Set cookie → Return user data
   ```

2. **User Login**:
   ```
   User → POST /api/auth/login → Server validates → Check password → 
   Create session → Set cookie → Return user data
   ```

3. **Session Verification**:
   ```
   App loads → GET /api/auth/verify → Server checks session cookie → 
   Return user data or 401
   ```

4. **User Logout**:
   ```
   User → POST /api/auth/logout → Server destroys session → 
   Clear cookie → Redirect to home
   ```

### Password Security

- **Hashing**: bcryptjs with salt rounds
- **Storage**: Only hashed passwords stored in database
- **Validation**: Minimum 8 characters required

### Session Security

- **HttpOnly Cookies**: Prevents XSS attacks
- **SameSite**: 'lax' - Prevents CSRF
- **Expiration**: 7 days
- **Persistent Storage**: SQLite session store

### OAuth Integration

**Google OAuth 2.0** (configured but requires API keys):
- Strategy: passport-google-oauth20
- Callback URL: `/api/auth/google/callback`
- Scopes: profile, email

---

## Environment Variables

### Frontend (`.env`)
```bash
VITE_API_URL=http://localhost:5000  # Backend API URL
```

### Backend (`server/.env`)
```bash
# Server Configuration
PORT=5000                                    # Server port
FRONTEND_URL=http://localhost:5173          # Frontend URL for CORS

# Security
JWT_SECRET=your-secret-key-change-this-in-production
SESSION_SECRET=your-session-secret-change-this

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# AI Chatbot (Optional)
OPENAI_API_KEY=your-openai-api-key-here
```

**⚠️ Security Note**: Change all secrets in production!

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Step 1: Clone/Navigate to Project
```bash
cd "/home/pradhyum/project /Home page"
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```

### Step 3: Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### Step 4: Configure Environment Variables

Create `.env` in project root:
```bash
echo "VITE_API_URL=http://localhost:5000" > .env
```

Create `server/.env`:
```bash
cd server
cat > .env << EOF
JWT_SECRET=your-secret-key-change-this
SESSION_SECRET=your-session-secret-change-this
PORT=5000
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
OPENAI_API_KEY=your-openai-api-key-here
EOF
cd ..
```

### Step 5: Start Development Servers

**Terminal 1 - Backend**:
```bash
cd server
npm start
```

**Terminal 2 - Frontend**:
```bash
npm run dev
```

### Step 6: Access Application
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## API Reference

### Authentication Endpoints

#### POST `/api/auth/signup`
Create new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe"
  }
}
```

**Errors**:
- 400: Email or username already exists
- 500: Server error

---

#### POST `/api/auth/login`
Authenticate user.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "avatar_url": "/uploads/avatars/avatar-123.jpg"
  }
}
```

**Errors**:
- 400: Invalid credentials
- 500: Server error

---

#### GET `/api/auth/verify`
Verify current session.

**Headers**: Session cookie (automatic)

**Response** (200):
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe"
  }
}
```

**Errors**:
- 401: Not authenticated

---

#### POST `/api/auth/logout`
End user session.

**Response** (200):
```json
{
  "message": "Logged out successfully"
}
```

---

### Profile Endpoints

#### GET `/api/profile`
Get user profile.

**Authentication**: Required

**Response** (200):
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "avatar_url": "/uploads/avatars/avatar-123.jpg",
  "bio": "Full-stack developer",
  "location": "San Francisco, CA",
  "social_links": {
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "instagram": "",
    "website": "https://johndoe.com"
  }
}
```

---

#### PUT `/api/profile`
Update user profile.

**Authentication**: Required

**Request Body**:
```json
{
  "username": "johndoe",
  "bio": "Full-stack developer",
  "location": "San Francisco, CA",
  "social_links": {
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "instagram": "",
    "website": ""
  }
}
```

**Response** (200):
```json
{
  "message": "Profile updated successfully",
  "user": { /* updated user object */ }
}
```

---

#### POST `/api/profile/avatar`
Upload user avatar.

**Authentication**: Required

**Request**: multipart/form-data with `avatar` file

**Response** (200):
```json
{
  "message": "Avatar uploaded successfully",
  "avatar_url": "/uploads/avatars/avatar-1234567890.jpg"
}
```

**File Restrictions**:
- Max size: 5MB
- Allowed types: JPEG, PNG, GIF, WebP

---

### Navigation History Endpoints

#### POST `/api/history`
Add navigation history entry.

**Authentication**: Required

**Request Body**:
```json
{
  "itemType": "repository",
  "itemName": "my-project",
  "itemUrl": "https://github.com/user/my-project"
}
```

**Response** (200):
```json
{
  "message": "History entry added"
}
```

---

#### GET `/api/history`
Get user's navigation history.

**Authentication**: Required

**Query Parameters**:
- `limit` (optional): Number of entries (default: 10)

**Response** (200):
```json
{
  "history": [
    {
      "id": 1,
      "item_type": "repository",
      "item_name": "my-project",
      "item_url": "https://github.com/user/my-project",
      "visited_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Chatbot Endpoints

#### GET `/api/chatbot/history`
Get chat history.

**Authentication**: Required

**Response** (200):
```json
{
  "history": [
    {
      "id": 1,
      "message": "Hello!",
      "response": "Hi! How can I help you?",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### POST `/api/chatbot/message`
Send message to chatbot.

**Authentication**: Required

**Request Body**:
```json
{
  "message": "How do I deploy my app?"
}
```

**Response** (200):
```json
{
  "response": "To deploy your app, you can use services like Vercel, Netlify, or AWS..."
}
```

**Note**: Requires `OPENAI_API_KEY` environment variable

---

## Deployment

### Production Checklist

#### Backend
- [ ] Set `NODE_ENV=production`
- [ ] Change `JWT_SECRET` and `SESSION_SECRET`
- [ ] Set `cookie.secure = true` (requires HTTPS)
- [ ] Configure production database
- [ ] Set up proper CORS origins
- [ ] Enable rate limiting
- [ ] Set up logging
- [ ] Configure file upload limits

#### Frontend
- [ ] Build production bundle: `npm run build`
- [ ] Update `VITE_API_URL` to production API
- [ ] Configure CDN for static assets
- [ ] Enable gzip compression
- [ ] Set up analytics

#### Database
- [ ] Backup database regularly
- [ ] Consider migrating to PostgreSQL/MySQL for production
- [ ] Set up database migrations
- [ ] Index frequently queried columns

### Deployment Options

#### Frontend
- **Vercel** (Recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **GitHub Pages**

#### Backend
- **Railway**
- **Render**
- **Heroku**
- **AWS EC2**
- **DigitalOcean**

---

## Troubleshooting

### Common Issues

#### 1. "Failed to fetch" Error
**Cause**: Backend not running or CORS issue  
**Solution**:
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS settings in `server/index.js`

#### 2. Session Not Persisting
**Cause**: Cookie settings or CORS credentials  
**Solution**:
- Ensure `credentials: true` in CORS config
- Check `credentials: 'include'` in fetch requests
- Verify session secret is set

#### 3. Database Errors
**Cause**: Missing columns or corrupted database  
**Solution**:
- Delete `server/devhub.db` and restart server
- Check migration code in `server/db.js`

#### 4. Avatar Upload Fails
**Cause**: Missing upload directory  
**Solution**:
```bash
mkdir -p public/uploads/avatars
```

#### 5. Chatbot Not Working
**Cause**: Missing OpenAI API key  
**Solution**:
- Add `OPENAI_API_KEY` to `server/.env`
- Get API key from https://platform.openai.com

---

## Data Storage Summary

### Where Data is Stored

| Data Type | Storage Location | Format |
|-----------|------------------|--------|
| **User Accounts** | `server/devhub.db` → `users` table | SQLite database |
| **Sessions** | `server/devhub.db` → `sessions` table | SQLite database |
| **Chat History** | `server/devhub.db` → `chat_messages` table | SQLite database |
| **Navigation History** | `server/devhub.db` → `navigation_history` table | SQLite database |
| **User Avatars** | `public/uploads/avatars/` | Image files (JPEG/PNG/GIF/WebP) |
| **Environment Config** | `.env` and `server/.env` | Plain text files |
| **Frontend Build** | `dist/` (after build) | Static HTML/CSS/JS files |

### Database File Location
```
/home/pradhyum/project /Home page/server/devhub.db
```

**Size**: ~40KB (grows with user data)

---

## Support & Maintenance

### Logs
- Backend logs: Console output (consider using Winston or Morgan)
- Frontend logs: Browser console

### Monitoring
- Health check endpoint: `GET /api/health`
- Returns: `{ "status": "ok" }`

### Backup
```bash
# Backup database
cp server/devhub.db server/devhub.db.backup

# Backup uploaded files
tar -czf uploads-backup.tar.gz public/uploads/
```

---

## License
ISC

## Author
DevHub Team

---

**Last Updated**: November 26, 2024  
**Version**: 1.0.0
