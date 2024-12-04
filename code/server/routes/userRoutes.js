const express = require('express');
const { createUser, loginUser, viewUsers, manageProfile, updateProfile, resetPasswordRequest, confirmOneTimePassword, passwordReset } = require('../controllers/userController');
const router = express.Router();

// Create a new user
router.post('/create-user', createUser);

// User login
router.post('/login', loginUser);
router.post('/reset-password-request', resetPasswordRequest);
router.post('/one-time-password', confirmOneTimePassword);
router.post('/password-reset', passwordReset);

// View all users
router.get('/view-users', viewUsers);

// Manage user profile (GET and POST)
router.get('/manage-profile', manageProfile);
router.post('/manage-profile', updateProfile);

module.exports = router;