const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {getHealthData, addHealthData, updatePatient, deletePatient, getPatients} = require("../controllers/healthController");
const auth = require("../middleware/authMiddleware");


router.get('/', auth, getHealthData);
router.post("/",[
    auth,
    check("patientId","Paitient ID is required").not().isEmpty(),
    check("heartRate","Heart rate must be a number").isNumeric(),
    check("bloodPressure","Blood pressure is required").not().isEmpty(),
    check("temperature","Temperature must be a number").isNumeric()
],addHealthData
);
router.get('/patients', auth, getPatients);
router.put('/patients/:id', auth, updatePatient);
router.delete('/patients/:id', auth, deletePatient);
module.exports = router;