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
        if(errors.isEmpty()){
            res.status(400).json({errors:errors.array()})
        }

        const {patientId, heartRate, bloodPressure, temperature} = req.body;

        const newHealthData = new HealthData({
            patientId,
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