const mongoose = require('mongoose');

const apiLogSchema = new mongoose.Schema({
    statusCode: { type: Number, required: true },
    request: { type: Object, required: true },
    response: { type: Object, required: true },
    metadata: { type: Object },
},
    {
        timestamps: true,
    });

// Indexing the createdAt for efficient querying
apiLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ApiLog', apiLogSchema); 