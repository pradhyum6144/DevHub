const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { saveChatMessage, getChatHistory } = require('./db');
const { requireAuth } = require('./auth');

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are a helpful AI assistant for DevHub, a developer collaboration platform similar to GitHub. 
Your role is to help users with:
- Questions about their projects, issues, and organizations
- General programming and development questions
- DevHub platform features and usage

Keep your responses:
- Short and concise (2-3 sentences max)
- Relevant and helpful
- Professional but friendly
- Focused on developer needs

If you don't know something specific about DevHub, be honest and provide general helpful guidance instead.`;

router.post('/message', requireAuth, async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here') {
            return res.status(503).json({
                error: 'Gemini API key not configured',
                response: 'I apologize, but the AI service is not configured yet. Please add your Gemini API key to the server environment variables.'
            });
        }

        const history = getChatHistory(req.userId, 5).reverse();

        let conversationContext = SYSTEM_PROMPT + '\n\n';

        history.forEach(chat => {
            conversationContext += `User: ${chat.message}\n`;
            conversationContext += `Assistant: ${chat.response}\n\n`;
        });

        conversationContext += `User: ${message}\n`;

        const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
        const result = await model.generateContent(conversationContext);
        const aiResponse = result.response.text();

        saveChatMessage(req.userId, message, aiResponse);

        res.json({
            message: message,
            response: aiResponse
        });

    } catch (error) {
        console.error('Chatbot error:', error);

        res.status(500).json({
            error: 'Failed to get response',
            response: 'I apologize, but I encountered an error. Please try again.'
        });
    }
});

router.get('/history', requireAuth, (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const history = getChatHistory(req.userId, limit);

        res.json({
            history: history.reverse()
        });
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
});

module.exports = router;
