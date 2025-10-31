// Import rate-limiting middleware from Express
const rateLimit = require('express-rate-limit')

// Function to create a rate limiter middleware
const basicrateLimiter = (maxrequests, time) => {
    return rateLimit({
        max: maxrequests,        // Maximum number of allowed requests
        windowMs: time,          // Time window (in milliseconds)
        message: `TOO MANY requests`, // Message shown when limit is exceeded
        legacyHeaders: true,     // Send old X-RateLimit-* headers
        standardHeaders: false   // Disable newer standardized rate limit headers
    })
}

// Export the function for use in other files
module.exports = {
    basicrateLimiter
}
