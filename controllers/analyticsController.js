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

exports.getAverageTemperature = async (req,res) => {
    try {
        const averageTemperature = await HealthData.aggregate([
            {
                $group:{
                    _id:null,
                    averageTemperature:{$avg:"$temperature"}
                }
            }
        ]);

        res.json(averageTemperature);
    }catch (err) {
        res.status(500).send('Something went wrong on server');
        }
};


exports.getDailyHealthStats = async (req, res) => {
    try{
       const dailyStats = await HealthData.aggregate([
        {
            $group:{
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$timeStamp" } },
                averageHeartRate:{$avg:"$heartRate"},
                averageBloodPressure:{$avg:"$bloodPressure"},
                averageTemperature:{$avg:"$temperature"},
                count:{$sum:1}
            }
        },
        {
          $sort: { _id: 1 } // Sort by date
        }
       ]);
       res.json(dailyStats);
    }catch(err){
        res.status(500).send('Something went wrong on server');
    }
};

exports.getAverageHeartRateByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const avgHeartRate = await HealthData.aggregate([
            {
                $match: { patientId }
            },
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

exports.getAverageBloodPressureByPatientId = async (req,res) => {
    try {
        const { patientId } = req.params;
        const averageBloodPressure = await HealthData.aggregate([
            {
                $match: { patientId }
            },
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

exports.getAverageTemperatureByPatientId = async (req,res) => {
    try {
        const { patientId } = req.params;
        const averageTemperature = await HealthData.aggregate([
            {
                $match: { patientId }
            },
            {
                $group:{
                    _id:null,
                    averageTemperature:{$avg:"$temperature"}
                }
            }
        ]);

        res.json(averageTemperature);
    }catch (err) {
        res.status(500).send('Something went wrong on server');
        }
};

exports.getDailyHealthStatsByPatientId = async (req,res) => {
    try {
        const { patientId } = req.params;
        const dailyStats = await HealthData.aggregate([
          {
            $match: { patientId }
          },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$timeStamp" } },
              averageHeartRate:{$avg:"$heartRate"},
              averageBloodPressure:{$avg:"$bloodPressure"},
              averageTemperature:{$avg:"$temperature"},
              count:{$sum:1}
            }
          },
          {
            $sort: { _id: 1 }
          }
        ]);
        res.json(dailyStats);
      } catch (err) {
        res.status(500).send('Something went wrong on the server');
      }
};