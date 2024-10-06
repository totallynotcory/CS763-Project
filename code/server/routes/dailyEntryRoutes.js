// routes/dailyEntryRoutes.js
const express = require('express');
const { enterDailyData } = require('../controllers/dailyEntryController');
const router = express.Router();

// Enter daily data
router.post('/enter-daily-data', enterDailyData);

module.exports = router;