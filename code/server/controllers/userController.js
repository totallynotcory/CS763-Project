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
        // TO DO: UPDATE THIS TO GRAB USER ID FROM LOCAL STORAGE, rather than hardcode
        const userId = 10001 // req.userId; 
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

    // Find user in the database using userId
    const userProfile = await User.findOne({ userId });

    // Check if user exists
    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the profile with the new values
    userProfile.name = name;
    userProfile.gender = gender;
    userProfile.dob = dob;
    userProfile.height = height;

    // Save the updated user profile
    await userProfile.save();

    // Send a success response
    res.status(200).json({ message: "Profile updated successfully", userProfile });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Create User
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
          return res.status(400).json({ message: 'Error: An account with this email already exists' });
        }
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Autogenerate user ID based on maximum ID in users table
        let lastUser = await User.find().sort({"userId": -1}).limit(1) 
        let newUserId = lastUser[0].userId + 1 
    
        const newUser = new User({
          userId: newUserId,
          name: name,
          email: email,
          passwordHashed: hashedPassword
        })
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
    
        // Find the user by email
        const user = await User.findOne({ email: email });
    
        if (!user) {
          // User not found
          return res.status(401).json({ message: 'Invalid email or password.' });
        }
        
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHashed);
        // console.log('Password validation result:', isPasswordValid);
    
        if (!isPasswordValid) {
          // Password does not match
          return res.status(401).json({ message: 'Invalid email or password.' });
        }
    
        // Generate a token (e.g., JWT)
        const secretKey = process.env.SECRET_KEY; // Use environment variable in production
        // console.log('JWT_SECRET:', secretKey);
        // const secretKey = "myproductionsecret"
    
        if (!secretKey) {
          // console.error('JWT_SECRET  is not defined');
          return res.status(500).json({ message: 'no secret key' });
        }
    
        const token = jwt.sign(
          { userId: user.userId, email: user.email },
          secretKey,
          { expiresIn: '1h' }
        );
        // console.log('JWT Secret:', process.env.SECRET_KEY);
    
        // Send the token to the client
        res.json({ token: token, message: 'Login successful' });
    
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
};