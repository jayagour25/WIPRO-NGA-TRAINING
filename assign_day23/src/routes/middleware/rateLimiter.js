// src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // limit to 5 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' } // matches assignment spec
});

module.exports = apiRateLimiter;
