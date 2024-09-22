//This file is the main entrypoint for the backend of the application.
//It sets up and runs the server, it connects to the database, and it defines how the application responds to incoming requests.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require("./db.js")


const app = express();
const port = process.env.PORT || 5000
const User = db.getModel().userModel

app.use(cors('http://localhost:3000')); //update with environment variable for deployment
app.use(express.json());


// WILL IMPLEMENT EXPRESS ROUTER--JUST USING THESE ROUTES FOR TESTING

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.get('/check-connection', async (req, res) => {
  res.sendStatus(200)
})

app.get('/view-users', async (req, res) => {
  allUsers = await User.find({})
  res.json(allUsers)
})

app.post('/create-user', async (req, res) => {

  try {
    const newUser = new User({
      userId: req.body.userId,
      name: req.body.name,
      email: req.body.email,
      passwordHashed: req.body.passwordHashed
    })
    await Promise.all([
      newUser.save()
    ])
  } catch (error) {
    console.log(error)
  }

})


//Listen for incoming connections
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});