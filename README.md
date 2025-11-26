# DevHub

A modern developer collaboration platform with authentication, user profiles, and AI-powered chatbot assistance.

## 🚀 Features

- **User Authentication**: Secure login/signup with session-based authentication
- **User Profiles**: Customizable user profiles with avatar support
- **AI Chatbot**: Intelligent chatbot with context memory
- **Responsive Design**: Beautiful UI that works on all devices
- **Google OAuth**: Sign in with Google (optional)

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js
- Express
- SQLite (better-sqlite3)
- Session-based authentication
- OpenAI API integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "project /Home page"
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

   Create a `.env` file in the `server` directory:
   ```env
   SESSION_SECRET=your-secret-key-here
   OPENAI_API_KEY=your-openai-api-key-here
   PORT=5000
   ```

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   The server will run on http://localhost:5000

2. **Start the frontend (in a new terminal)**
   ```bash
   npm run dev
   ```
   The app will run on http://localhost:5173

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Write clear, descriptive commit messages
- Follow the existing code style
- Test your changes before submitting
- Update documentation as needed

## 📁 Project Structure

```
.
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── pages/           # Page components
│   └── App.jsx          # Main app component
├── server/              # Backend source code
│   ├── auth.js          # Authentication routes
│   ├── profile.js       # Profile management
│   ├── chatbot.js       # Chatbot API
│   ├── db.js            # Database setup
│   └── index.js         # Server entry point
├── public/              # Static assets
└── README.md            # This file
```

## 📝 Documentation

For detailed documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)

For quick reference, see [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributors

Thanks to all contributors who help make DevHub better!

## 🐛 Issues

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 💬 Support

For questions or support, please open an issue or reach out to the maintainers.
