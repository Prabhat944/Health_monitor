const express = require('express');
const router = express.Router();
const { getAverageHeartRate, getAverageBloodPressure, getDailyHealthStats } = require('../controllers/analyticsController');
const auth = require('../middleware/authMiddleware');


router.get('/average-heart-rate', auth, getAverageHeartRate);
router.get('/average-blood-pressure', auth, getAverageBloodPressure);
router.get('/daily-stats', auth, getDailyHealthStats);

module.exports = router;