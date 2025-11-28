// src/app.js
const express = require('express');
const courseRoutes = require('./routes/courses');
const apiRateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Parse JSON bodies
app.use(express.json());

// Apply rate limiting to all /api routes (5 requests per minute)
app.use('/api', apiRateLimiter);

// Versioned API route for courses (best practice)
app.use('/api/v1/courses', courseRoutes);

// Centralized error handling middleware (last)
app.use(errorHandler);

module.exports = app;
