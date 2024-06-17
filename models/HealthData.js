const mongoose = require("mongoose");

const healthDataSchema = new mongoose.Schema({
    patientId: {
        type:String,
        required:true
    },
    name: {
        type:String,
        default:"anonymous"
    },
    timeStamp:{
        type:Date,
        default:Date.now,
    },
    heartRate:{
        type:Number,
        required:true,
    },
    bloodPressure:{
        type:Number,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    }
});


module.exports = mongoose.model("HealthData", healthDataSchema);