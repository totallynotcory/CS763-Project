// controllers/dailyEntryController.js
const DailyEntry = require("../models/DailyEntry");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Enter daily data
exports.enterDailyData = async (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }
    // Verify and decode the token
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    // Extract userId from the decoded token
    const userId = decoded.userId;
    
    // console.log("Request body: ", req.body);
    const { weight, steps, sleep, water, exercise, entryDate } = req.body;

    let lastEntry = await DailyEntry.find().sort({ dailyEntryId: -1 }).limit(1);
    let newEntryId = lastEntry.length > 0 ? lastEntry[0].dailyEntryId + 1 : 1;

    const newDailyEntry = new DailyEntry({
      dailyEntryId: newEntryId,
      userId: userId,
      // entryDate: new Date(), // Adjust according to your form logic
      entryDate: entryDate ? new Date(entryDate) : new Date(),
      weight,
      steps,
      sleep,
      water,
      exercise,
    });

    await newDailyEntry.save();
    res.status(201).json({ message: "Daily entry created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating daily entry" });
  }
};


//View daily data
exports.viewDailyData = async (req,res) => {
  
  // res.send("viewing daily data...")
  
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    // Verify and decode the token
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    
    // Extract userId from the decoded token
    const userId = decoded.userId;

    const userProfile = await User.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}