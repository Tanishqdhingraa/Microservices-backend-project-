require('dotenv').config();               // Load env vars
const express = require('express');

const { configcors } = require('./config/corsconfig'); 
const { requestlogger, Addtimestamp } = require('./middleware/Custommiddleware');
const { globalErrorHandler } = require('./middleware/errorhanlder'); // make sure filename matches exactly
const { Apiversion } = require('./middleware/Apiversion');
const { basicrateLimiter } = require('./middleware/ratelimiting');

const itemRoutes = require('./routes/item-routes'); // routes file
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares (order matters)
app.use(requestlogger);            // log requests
app.use(Addtimestamp);             // attach timestamp

app.use(express.json());           // parse JSON bodies
app.use(configcors());             // CORS

// Rate limit (global) - keep before routes or on specific routes as needed
app.use(basicrateLimiter(100, 60_000)); // 100 requests per minute

// API version check middleware (will check path or header depending on your implementation)
app.use(Apiversion('v1'));         // ensure this middleware file exports correctly

// Mount routes under /api/v1
app.use('/api/v1', itemRoutes);

// Global error handler (after routes)
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
