const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const credentials = require("./credentials.js")
const db = require("./db.js")


const app = express();
const PORT = 5000;
const User = db.getModel().userModel

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(credentials.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api', async (req, res) => {
  //basic test, sends all user data
  allUsers = await User.find({})
  allUsers = JSON.stringify(allUsers)
  res.send(allUsers)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});