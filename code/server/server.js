//This file is the main entrypoint for the backend of the application.
//It sets up and runs the server, it connects to the database, and it defines how the application responds to incoming requests.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require("./db.js")

const app = express();
const port = process.env.PORT || 5000;
const User = db.getModel().userModel;
const Goal = db.getModel().goalModel;

app.use(cors());
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
    let lastUser = await User.find().sort({"userId": -1}).limit(1) 
    let newUserId = lastUser[0].userId + 1 
    
    const newUser = new User({
      userId: newUserId,
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

app.post('/create-goal', async (req, res) => {
  try {
    // generate new ID based on max goal ID
    let lastGoal = await Goal.find().sort({"goalId": -1}).limit(1) 
    let newGoalId = lastGoal[0].goalId + 1 
    
    // define unit based on this pre-defined list
    let unit;
    switch (req.body.type) {
        case "sleep":
            unit = "hours";
            break;
        case "weight":
            unit = "lbs";
            break;
        case "steps":
            unit = "steps";
            break;
        case "water":
            unit = "glasses";
            break;
        case "exercise":
            unit = "minutes"; 
            break;
        default:
            unit = "unknown"; // default case
    }

    // create new goal and save to DB
    let newGoal = new Goal({
      goalId: newGoalId,
      type: req.body.type,
      targetValue: req.body.targetValue,
      unit: unit,
      // createdAt and progress will use defaults
    })
    await newGoal.save()
    
  } catch (error) {
    console.log(error)
  }
})

//Listen for incoming connections
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});