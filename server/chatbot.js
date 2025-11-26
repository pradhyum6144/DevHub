const express = require('express');
const OpenAI = require('openai');
const { saveChatMessage, getChatHistory } = require('./db');
const { requireAuth } = require('./auth');

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// System prompt for the chatbot
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

// Send message and get AI response
router.post('/message', requireAuth, async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Check if OpenAI API key is configured
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
            return res.status(503).json({
                error: 'OpenAI API key not configured',
                response: 'I apologize, but the AI service is not configured yet. Please add your OpenAI API key to the server environment variables.'
            });
        }

        // Get recent chat history for context
        const history = getChatHistory(req.userId, 5).reverse();

        // Build conversation context
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT }
        ];

        // Add recent history for context
        history.forEach(chat => {
            messages.push({ role: 'user', content: chat.message });
            messages.push({ role: 'assistant', content: chat.response });
        });

        // Add current message
        messages.push({ role: 'user', content: message });

        // Get AI response
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 150,
            temperature: 0.7,
        });

        const aiResponse = completion.choices[0].message.content;

        // Save to database
        saveChatMessage(req.userId, message, aiResponse);

        res.json({
            message: message,
            response: aiResponse
        });

    } catch (error) {
        console.error('Chatbot error:', error);

        // Handle specific OpenAI errors
        if (error.status === 401) {
            return res.status(503).json({
                error: 'Invalid OpenAI API key',
                response: 'The AI service is experiencing authentication issues. Please check the API key configuration.'
            });
        }

        res.status(500).json({
            error: 'Failed to get response',
            response: 'I apologize, but I encountered an error. Please try again.'
        });
    }
});

// Get chat history
router.get('/history', requireAuth, (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const history = getChatHistory(req.userId, limit);

        res.json({
            history: history.reverse() // Return in chronological order
        });
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
});

module.exports = router;
