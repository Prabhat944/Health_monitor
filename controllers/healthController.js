const HealthData = require("../models/HealthData");
const {validationResult} = require("express-validator");

exports.getHealthData = async(req,res) => {
    try{
        const data = await HealthData.find();
        res.json(data);
    }catch(err){
        res.status(500).send("Something went wrong on server")
    }
}


exports.addHealthData = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors:errors.array()})
        }

        const {patientId, name, heartRate, bloodPressure, temperature} = req.body;

        const newHealthData = new HealthData({
            patientId,
            name,
            heartRate,
            bloodPressure,
            temperature
        });
        await newHealthData.save();
        res.json(newHealthData);
    }catch(err){
        res.status(500).send("Something went wrong on server")
    }
}

exports.getPatients = async (req, res) => {
    try {
      const query = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
      const patients = await HealthData.find(query).sort({ date: -1 });
      res.json(patients);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Something went wrong on server")
    }
};

exports.updatePatient = async (req, res) => {
    try {
      const patient = await HealthData.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(patient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Something went wrong on server")
    }
  };
  
  exports.deletePatient = async (req, res) => {
    try {
      const patient = await HealthData.findById(req.params.id);
      await patient.deleteOne();
      res.json({ msg: 'Patient removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Something went wrong on server")
    }
  };