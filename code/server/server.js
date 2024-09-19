//This file is the main entrypoint for the backend of the application.
//It sets up and runs the server, it connects to the database, and it defines how the application responds to incoming requests.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require("./db.js")


const app = express();
const port = process.env.PORT || 5000
const User = db.getModel().userModel

app.use(cors('http://localhost:3000')); //update when deploying
app.use(express.json());


// WILL IMPLEMENT EXPRESS ROUTER--JUST USING THESE ROUTES TESTING

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api', async (req, res) => {
  allUsers = await User.find({})
  res.json(allUsers)
  // res.json({"users": ["hey", "hi"]})
})

app.get('/view-users', async (req, res) => {
  allUsers = await User.find({})
  res.json(allUsers)
})

app.post('/create-user', async (req, res) => {
  console.log(req)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});