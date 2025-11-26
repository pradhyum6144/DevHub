# DevHub - Quick Reference Guide

## 🚀 Project Summary

**DevHub** is a full-stack web application for developers with authentication, profiles, AI chatbot, and more.

---

## 📚 Tech Stack at a Glance

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.21** - Build tool
- **Tailwind CSS 3.4.15** - Styling
- **React Router DOM 6.28.0** - Routing
- **Lucide React** - Icons

### Backend
- **Node.js + Express 4.18.2** - Server
- **SQLite (Better-SQLite3)** - Database
- **bcryptjs** - Password hashing
- **Express-Session** - Session management
- **OpenAI** - AI chatbot
- **Multer** - File uploads
- **Passport + Google OAuth** - Authentication

---

## 📁 Key File Locations

### Frontend
```
src/
├── components/        # Reusable UI components
│   ├── Button.jsx
│   ├── FormInput.jsx
│   └── ErrorMessage.jsx
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── Dashboard.jsx
│   └── ProfileSettings.jsx
├── context/          # React context
│   └── AuthContext.jsx
├── utils/            # Utilities
│   ├── validation.js
│   ├── constants.js
│   └── helpers.js
└── App.jsx           # Root component
```

### Backend
```
server/
├── index.js          # Server entry point
├── auth.js           # Auth routes
├── profile.js        # Profile routes
├── chatbot.js        # Chatbot routes
├── history.js        # Navigation history routes
├── db.js             # Database operations
├── devhub.db         # SQLite database file
└── .env              # Environment variables
```

---

## 🗄️ Database Schema

### Tables

**users** - User accounts
- id, email, username, password (hashed)
- avatar_url, bio, location, social_links
- created_at

**sessions** - User sessions
- sid, sess, expired

**navigation_history** - User navigation
- id, user_id, item_type, item_name, item_url, visited_at

**chat_messages** - Chatbot conversations
- id, user_id, message, response, created_at

**Database File**: `/home/pradhyum/project /Home page/server/devhub.db`

---

## 🔐 Environment Variables

### Frontend (`.env`)
```bash
VITE_API_URL=http://localhost:5000
```

### Backend (`server/.env`)
```bash
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key-change-this
SESSION_SECRET=your-session-secret-change-this
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
OPENAI_API_KEY=your-openai-api-key-here
```

---

## ⚡ Common Commands

### Development
```bash
# Start backend (Terminal 1)
cd server
npm start

# Start frontend (Terminal 2)
npm run dev
```

### Build
```bash
# Build frontend for production
npm run build

# Preview production build
npm run preview
```

### Database
```bash
# View database contents
cd server
node view_db.js

# Backup database
cp devhub.db devhub.db.backup
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify session
- `POST /api/auth/logout` - Logout

### Profile
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/avatar` - Upload avatar

### Chatbot
- `GET /api/chatbot/history` - Get chat history
- `POST /api/chatbot/message` - Send message

### Navigation History
- `GET /api/history` - Get history
- `POST /api/history` - Add history entry

### Health Check
- `GET /api/health` - Server health

---

## 🔧 Data Storage

| Data | Location |
|------|----------|
| User accounts | `server/devhub.db` → users table |
| Sessions | `server/devhub.db` → sessions table |
| Chat history | `server/devhub.db` → chat_messages table |
| Navigation history | `server/devhub.db` → navigation_history table |
| User avatars | `public/uploads/avatars/` |
| Config | `.env` files |

---

## 🐛 Quick Troubleshooting

### "Failed to fetch" Error
1. Check backend is running: `http://localhost:5000/api/health`
2. Verify `VITE_API_URL` in `.env`
3. Check CORS settings in `server/index.js`

### Session Not Persisting
1. Ensure `credentials: true` in CORS config
2. Check `credentials: 'include'` in fetch requests
3. Verify session secret is set in `server/.env`

### Database Errors
1. Delete `server/devhub.db` and restart server
2. Check migration code in `server/db.js`

### Avatar Upload Fails
```bash
mkdir -p public/uploads/avatars
```

### Chatbot Not Working
1. Add `OPENAI_API_KEY` to `server/.env`
2. Get key from https://platform.openai.com

---

## 📊 Code Quality Status

### ✅ No Critical Errors Found

**Checked**:
- ✅ All imports are valid
- ✅ Database schema is correct
- ✅ API routes are properly configured
- ✅ Session management is working
- ✅ CORS is configured correctly
- ✅ File upload is configured
- ✅ Environment variables are documented

**Console.log Statements**:
- Present in `server/profile.js` for debugging profile updates
- Present in `server/db.js` for database migration logging
- Present in `server/auth.js` for session debugging
- These are intentional and helpful for development

**Recommendations**:
1. Consider using a proper logging library (Winston/Morgan) for production
2. Remove or disable debug console.logs in production
3. Add ESLint configuration file for code quality checks

---

## 🚀 Deployment Checklist

### Before Deploying
- [ ] Change all secrets in `server/.env`
- [ ] Set `NODE_ENV=production`
- [ ] Set `cookie.secure = true` in session config
- [ ] Build frontend: `npm run build`
- [ ] Update `VITE_API_URL` to production URL
- [ ] Set up database backups
- [ ] Configure proper CORS origins
- [ ] Add rate limiting
- [ ] Set up logging

### Recommended Platforms
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Heroku
- **Database**: Consider PostgreSQL for production

---

## 📖 Documentation Files

1. **DOCUMENTATION.md** - Complete technical documentation
2. **README.md** - Project overview
3. **walkthrough.md** - Frontend simplification walkthrough
4. **implementation_plan.md** - Simplification plan
5. **task.md** - Task checklist

---

## 🎯 Key Features

### Implemented
✅ User registration and login  
✅ Session-based authentication  
✅ User profiles with avatars  
✅ Social links (GitHub, LinkedIn, Instagram, Website)  
✅ AI-powered chatbot  
✅ Navigation history tracking  
✅ Responsive design  
✅ Dark theme  
✅ Protected routes  
✅ Form validation  

### Configured (Requires API Keys)
⚙️ Google OAuth login  
⚙️ OpenAI chatbot  

---

## 💡 Development Tips

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Wrap with `<ProtectedRoute>` if auth required

### Adding a New API Endpoint
1. Create route in appropriate file (`server/auth.js`, etc.)
2. Add `requireAuth` middleware if auth required
3. Update documentation

### Adding a New Form
1. Use `FormInput` component for fields
2. Use `Button` component for submit
3. Use validation functions from `utils/validation.js`
4. Use `ErrorMessage` for error display

---

## 🔗 Useful Links

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **Database**: `/home/pradhyum/project /Home page/server/devhub.db`

---

## 📞 Support

For issues or questions:
1. Check DOCUMENTATION.md for detailed info
2. Check troubleshooting section above
3. Review server logs for errors
4. Check browser console for frontend errors

---

**Project Version**: 1.0.0  
**Last Updated**: November 26, 2024
