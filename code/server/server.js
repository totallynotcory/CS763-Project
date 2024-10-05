const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Assuming you have a separate db connection file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

require('dotenv').config();

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/daily-entry', require('./routes/dailyEntryRoutes'));

// Test route
app.get('/', (req, res) => res.send('Server is running...'));

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));