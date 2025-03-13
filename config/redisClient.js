const Redis = require('ioredis');
require('dotenv').config();

const {
    REDIS_PASSWORD,
    REDIS_HOST,
    REDIS_PORT
} = process.env;

const createRedisClient = () => {
    // Redis client configuration
    const redisConfig = {
        host: REDIS_HOST || 'localhost',
        port: parseInt(REDIS_PORT) || 6379,
        password: REDIS_PASSWORD || '', // Default password matching docker-compose
        retryStrategy: (times) => {
            // Retry connection with exponential backoff
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        autoResubscribe: true,
        autoResendUnfulfilledCommands: true,
        lazyConnect: true // Connect when first command is executed
    };

    const redisClient = new Redis(redisConfig);

    // Redis event handlers
    redisClient.on('connect', () => {
        console.log('Redis client connected');
    });

    redisClient.on('ready', () => {
        console.log('Redis client is ready');
    });

    redisClient.on('error', (err) => {
        console.error('Redis connection error:', err);
    });

    redisClient.on('close', () => {
        console.log('Redis connection closed');
    });

    redisClient.on('reconnecting', () => {
        console.log('Redis client reconnecting');
    });

    return redisClient;
};

// Create Redis client instance
const redisClient = createRedisClient();

module.exports = { redisClient }; 