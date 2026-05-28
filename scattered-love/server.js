require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from 'public' directory

// Airtable configuration
const PERSONAL_ACCESS_TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = 'Popups';

// Get all popups
app.get('/api/popups', async (req, res) => {
    try {
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
            headers: {
                'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        // Only send necessary data to frontend
        const cleanedData = data.records.map(record => ({
            text: record.fields.text,
            image: record.fields.image,
            link: record.fields.link
        }));
        
        res.json(cleanedData);
    } catch (error) {
        console.error('Error fetching popups:', error);
        res.status(500).json({ error: 'Failed to fetch popups' });
    }
});

// Add new popup
app.post('/api/popups', async (req, res) => {
    try {
        const { text, image, link } = req.body;
        
        // Basic validation
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        // Validate URL formats if provided
        if (image && !isValidUrl(image)) {
            return res.status(400).json({ error: 'Invalid image URL' });
        }
        if (link && !isValidUrl(link)) {
            return res.status(400).json({ error: 'Invalid link URL' });
        }

        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                records: [{
                    fields: {
                        text,
                        image,
                        link
                    }
                }]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add popup');
        }

        res.json({ message: 'Popup added successfully' });
    } catch (error) {
        console.error('Error adding popup:', error);
        res.status(500).json({ error: 'Failed to add popup' });
    }
});

// URL validation helper
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});