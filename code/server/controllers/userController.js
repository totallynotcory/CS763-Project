const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// View all users
exports.viewUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Manage Profile (GET)
exports.manageProfile = async (req, res) => {
  try {
    const userId = req.body.userId || 10001;  // This should dynamically come from the request, e.g., req.userId
    const userProfile = await User.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Manage Profile (POST)
exports.updateProfile = async (req, res) => {
  try {
    const { userId, name, gender, dob, height } = req.body;

    const userProfile = await User.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    userProfile.name = name;
    userProfile.gender = gender;
    userProfile.dob = dob;
    userProfile.height = height;

    await userProfile.save();
    res.status(200).json({ message: "Profile updated successfully", userProfile });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let lastUser = await User.find().sort({ userId: -1 }).limit(1);
    let newUserId = lastUser.length > 0 ? lastUser[0].userId + 1 : 1;

    const newUser = new User({
      userId: newUserId,
      name,
      email,
      passwordHashed: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHashed);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    const token = jwt.sign({ userId: user.userId, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};