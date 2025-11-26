const express = require('express');
const { addNavigationHistory, getNavigationHistory } = require('./db');
const { requireAuth } = require('./auth');

const router = express.Router();

// Track navigation event
router.post('/track', requireAuth, (req, res) => {
    try {
        const { item_type, item_name, item_url } = req.body;

        if (!item_type || !item_name) {
            return res.status(400).json({ error: 'item_type and item_name are required' });
        }

        // Validate item_type
        const validTypes = ['organization', 'project', 'issue'];
        if (!validTypes.includes(item_type)) {
            return res.status(400).json({
                error: 'item_type must be one of: organization, project, issue'
            });
        }

        addNavigationHistory(req.userId, item_type, item_name, item_url || null);

        res.json({ message: 'Navigation tracked successfully' });
    } catch (error) {
        console.error('Error tracking navigation:', error);
        res.status(500).json({ error: 'Failed to track navigation' });
    }
});

// Get navigation history
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
