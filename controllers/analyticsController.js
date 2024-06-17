const HealthData = require('../models/HealthData');

exports.getAverageHeartRate = async (req, res) => {
    try {
        const avgHeartRate = await HealthData.aggregate([
            {
                $group:{
                    _id:null,
                    averageHeartRate:{$avg:"$heartRate"}
                }
            }
        ]);

        res.json(avgHeartRate);
    }catch (err) {
        res.status(500).send('Something went wrong on server');
        }
};

exports.getAverageBloodPressure = async (req,res) => {
    try {
        const averageBloodPressure = await HealthData.aggregate([
            {
                $group:{
                    _id:null,
                    averageBloodPressure:{$avg:"$bloodPressure"}
                }
            }
        ]);

        res.json(averageBloodPressure);
    }catch (err) {
        res.status(500).send('Something went wrong on server');
        }
};

exports.getDailyHealthStats = async (req, res) => {
    try{
       const dailyStats = await HealthData.aggregate([
        {
            $group:{
                _id:{$dateToString:{format:"%Y=%m-%d", date:"$timestamp"}},
                averageHeartRate:{$avg:"$heartRate"},
                averageTemperature: {$avg:"$temperature"},
                averageBloodPressure:{$avg:"$bloodPressure"},
                count:{$sum:1}
            }
        }
       ]);
       res.json(dailyStats);
    }catch(err){
        res.status(500).send('Something went wrong on server');
    }
};