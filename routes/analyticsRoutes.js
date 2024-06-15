const express = require('express');
const router = express.Router();
const { getAverageHeartRate, getAverageHeartRateByPatientId, getAverageBloodPressure, getAverageBloodPressureByPatientId, getAverageTemperature, getAverageTemperatureByPatientId, getDailyHealthStats, getDailyHealthStatsByPatientId } = require('../controllers/analyticsController');
const auth = require('../middleware/authMiddleware');


router.get('/average-heart-rate', auth, getAverageHeartRate);
router.get('/average-heart-rate/:patientId', auth, getAverageHeartRateByPatientId);
router.get('/average-blood-pressure', auth, getAverageBloodPressure);
router.get('/average-blood-pressure/:patientId', auth, getAverageBloodPressureByPatientId);
router.get('/average-temperature', auth, getAverageTemperature);
router.get('/average-temperature/:patientId', auth, getAverageTemperatureByPatientId);
router.get('/daily-stats', auth, getDailyHealthStats);
router.get('/daily-stats/:patientId', auth, getDailyHealthStatsByPatientId);

module.exports = router;