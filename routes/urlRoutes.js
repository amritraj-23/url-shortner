const express = require('express');
const urlController = require('../controllers/urlController');

const router = express.Router();

// Create short URL: POST /api/v1/urlshortner/createUrl
router.post('/createUrl', urlController.createShortUrl);

// Get original URL: GET /api/v1/urlshortner/getUrl/:shortUrl
router.get('/:shortUrl', urlController.redirectToOriginalUrl);

module.exports = router;    