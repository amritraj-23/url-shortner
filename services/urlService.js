const Url = require('../models/Url');
const redisClient = require('../config/redisClient').redisClient;
const shortener = require('../utils/shortener');

const MAX_ATTEMPTS = Number(process.env.MAX_ATTEMPTS_GENERATE_CODE) || 10;
const REDIS_EXPIRY = Number(process.env.REDIS_URL_EXPIRY_HOURS || 24) * 60 * 60; // Convert hours to seconds

const createShortUrl = async (originalUrl) => {
    let attempts = 0;
    while (attempts < MAX_ATTEMPTS) {
        try {
            const shortCode = shortener.generateShortCode();
            
            // Create new URL document
            const url = new Url({ 
                originalUrl, 
                shortCode,
                shortUrl: `${process.env.BASE_URL}/tiny/${shortCode}`
            });
            await url.save();

            // Set in Redis with expiry
            await redisClient.set(shortCode, originalUrl, "EX", REDIS_EXPIRY);

            return {
                shortCode,
                shortUrl: url.shortUrl
            };
        } catch (error) {
            // If duplicate key error, try again
            if (error.code === 11000 && error.keyPattern?.shortCode) {
                attempts++;
                continue;
            }
            throw error;
        }
    }
    throw new Error('Failed to generate unique short code after maximum attempts');
};

const getOriginalUrl = async (shortCode) => {
    try {
        // Try to get from Redis first
        const cachedUrl = await redisClient.get(shortCode);
        if (cachedUrl) {
            return cachedUrl
        }
        // If not in Redis, get from database
        const url = await Url.findOne({ shortCode });
        if (url) {
            // Set in Redis with expiry
            await redisClient.set(shortCode, url.originalUrl, "EX", REDIS_EXPIRY);
            return url.originalUrl;
        }
        return null;
    } catch (error) {
        console.error('Error getting original URL:', error);
        throw error;
    }
};

module.exports = {
    createShortUrl,
    getOriginalUrl
}; 