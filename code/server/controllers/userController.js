const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../utils/mfaTokenHandler');
const { encrypt, decrypt } = require('../utils/encryption');
const sendResetEmail = require('../utils/mailer');

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
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
    try {
      const { userId, name, gender, dob, height } = req.body;
  
      const userProfile = await User.findOne({ userId: Number(userId) });
  
      if (!userProfile) {
        return res.status(404).json({ message: 'User not found' });
      }  
 
      // Update the profile fields only if provided
      userProfile.name = name || userProfile.name;
      userProfile.gender = gender || userProfile.gender;
      
      // Update DOB only if the entire object is provided
      if (dob) {
        userProfile.dob.year = dob.year || userProfile.dob.year;
        userProfile.dob.month = dob.month || userProfile.dob.month;
        userProfile.dob.day = dob.day || userProfile.dob.day;
      }
  
      // Update height only if the entire object is provided
      if (height) {
        userProfile.height.feet = height.feet || userProfile.height.feet;
        userProfile.height.inches = height.inches || userProfile.height.inches;
      }
  
      await userProfile.save();
      res.status(200).json({ message: 'Profile updated successfully', userProfile });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile' });
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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const lastUser = await User.find().sort({ userId: -1 }).limit(1);
    const newUserId = lastUser.length > 0 ? lastUser[0].userId + 1 : 1;

    const newUser = new User({
      userId: newUserId,
      name,
      email,
      passwordHashed: hashedPassword
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

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const { formattedKey, formattedToken } = generateToken();

    const data = `${email}&${formattedKey}`
    const encryptedData = encrypt(data);
    const resetLink = `localhost:3000/one-time-password?${encryptedData}`
    sendResetEmail(formattedToken, email, resetLink);

    res.json({ message: 'Email sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.confirmOneTimePassword = async (req, res) => {
  try {
    const { otp, encodedData } = req.body;
    const decodedData = decrypt(encodedData);
    console.log(decodedData);
    const [email, formattedKey] = decodedData.split('&');
    console.log(email, formattedKey);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email.' });
    }

    if (!verifyToken(formattedKey, otp)) {
      return res.status(401).json({ message: 'Invalid token provided.' });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.passwordReset = async (req, res) => {
  try {
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

    const { password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    userProfile.passwordHashed = hashedPassword;

    await userProfile.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
}