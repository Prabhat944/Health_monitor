const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req,res,next){
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(401).json({msg:"No token found, authorization denied"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg:"Server error => Something went wrong"})
    }
};