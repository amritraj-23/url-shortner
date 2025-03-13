const ApiLog = require('../models/ApiLog');

const apiLogger = async (req, res, next) => {
    const originalSend = res.send;
    let responseBody;

    res.send = function (body) {
        responseBody = body;
        return originalSend.apply(this, arguments);
    };

    res.on('finish', async () => {
        try {
            const log = new ApiLog({
                statusCode: res.statusCode,
                request: {
                    method: req.method,
                    url: req.originalUrl,
                    headers: req.headers,
                    body: req.body
                },
                response: {
                    body: responseBody
                },
                metadata: {
                    // Add any additional metadata if needed
                }
            });
            await log.save();
        } catch (error) {
            console.error('Error logging API request:', error);
        }
    });
    next();
};

module.exports = apiLogger; 