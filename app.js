require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { redisClient } = require('./config/redisClient');
const urlRoutes = require('./routes/urlRoutes');
const apiLogger = require('./middlewares/apiLogger');

const app = express();
app.use(express.json());

// Use API logging middleware
app.use(apiLogger);

// Route for displaying the home page with a welcome message
app.get('/', (req, res) => {
    res.send('🔗 Url Shortener Service');
});

// Use URL routes with a prefix
app.use('/tiny', urlRoutes);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        // Wait for DB and Redis connections
        await connectDB();
        
        // Start server only after DB and Redis are connected
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 