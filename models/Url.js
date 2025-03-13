const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    shortUrl: String,
},{
    timestamps: true,
});

urlSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Url', urlSchema); 