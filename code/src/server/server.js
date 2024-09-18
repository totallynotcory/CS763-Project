//This file is the main entrypoint for the backend of the application.
//It sets up and runs the server, it connects to the database, and it defines how the application responds to incoming requests.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const credentials = require("./credentials.js")
const db = require("./db.js")


const app = express();
const port = process.env.PORT || 3000
const User = db.getModel().userModel

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(credentials.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// WILL IMPLEMENT EXPRESS ROUTER--JUST USING THESE ROUTES FOR SETUP PURPOSES

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api', async (req, res) => {
  //THIS IS JUST A TEST, WILL UPDATE API ROUTE
  allUsers = await User.find({})
  allUsers = JSON.stringify(allUsers)
  res.send(allUsers)
})

app.listen(port, () => {
  console.log(`Server running on port ${PORT}`);
});