// app.js
// This file defines and configures the Express application.

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const goalRoutes = require('./routes/goalRoutes'); // Import goal routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route for server status
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Define routes
app.use('/api/users', userRoutes); // All user-related routes
app.use('/api/goals', goalRoutes); // All goal-related routes

module.exports = app;