// routes/dailyEntryRoutes.js
const express = require('express');
const { enterDailyData, viewDailyData } = require('../controllers/dailyEntryController');
const router = express.Router();

// Enter daily data
router.post('/enter-daily-data', enterDailyData);
router.get('/view-daily-data', viewDailyData);

module.exports = router;