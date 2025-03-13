const mongoose = require('mongoose');
require('dotenv').config();

const {
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_DATABASE,
    MONGODB_AUTH_SOURCE
} = process.env;

const constructMongoURI = () => {
    if (MONGODB_USERNAME && MONGODB_PASSWORD) {
        // Add authSource=admin and the database name correctly
        return `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=${MONGODB_AUTH_SOURCE}`;
    }
    return `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
};

const connectDB = async () => {
    try {
        const mongoURI = constructMongoURI();
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB; 