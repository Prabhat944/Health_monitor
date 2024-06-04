const User = require("../models/User");


exports.getAllUsers = async(req,res) => {
    try{
        const users = await User.find().select('-password');
        res.json(users)
    }catch(err){
        console.error(err.message);
        res.status(500).send("Something went wrong on server")
    }
};