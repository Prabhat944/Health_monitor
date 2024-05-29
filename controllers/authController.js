const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
require("dotenv").config();

exports.register = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    const {name, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                msg:"User already exists"
            });
        }

        user = new User({
            name,email,password
        });
        await user.save();

        const payload = {id:user.id}
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:3600},
            (err,token)=>{
                if(err)throw err;
                res.json({token});
            }
        )
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error => Something went wrong");
    }
};


exports.login = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        const payload = {id:user.id}
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:3600},
            (err,token)=>{
                if(err)throw err;
                res.json({token})
            }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error => Something went wrong")
    }
};


exports.getUser = async(req,res) => {
    try{
        const user = await User.findById(req.user.id);
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error => Something went wrong")
    }
}