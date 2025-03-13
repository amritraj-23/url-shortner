const urlService = require('../services/urlService');

exports.createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const result = await urlService.createShortUrl(originalUrl);
        res.json(result);
    } catch (error) {
        console.error('Error in createShortUrl controller:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message 
        });
    }
};

exports.redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const originalUrl = await urlService.getOriginalUrl(shortUrl);
        if (originalUrl) {
            res.redirect(originalUrl);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}; 