const express = require('express');
const { addNavigationHistory, getNavigationHistory } = require('./db');
const { requireAuth } = require('./auth');

const router = express.Router();

router.post('/track', requireAuth, (req, res) => {
    try {
        const { itemType, itemName, itemUrl } = req.body;

        if (!itemType || !itemName) {
            return res.status(400).json({ error: 'itemType and itemName are required' });
        }

        addNavigationHistory(req.userId, itemType, itemName, itemUrl || null);

        res.json({ success: true });
    } catch (error) {
        console.error('Error tracking navigation:', error);
        res.status(500).json({ error: 'Failed to track navigation' });
    }
});

router.get('/', requireAuth, (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const history = getNavigationHistory(req.userId, limit);

        res.json({ history });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

module.exports = router;
