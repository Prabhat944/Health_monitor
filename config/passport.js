const {Strategy:JwtStrategy, ExtractJwt} = require('passport-jwt');
const User = require("../models/User");
const dotenv = require("dotenv");


dotenv.config();

const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async(jwtPayload, done) => {
            try{
                const user = await User.findById(jwtPayload.id);
                if(user){
                    return done(null,user);
                }
                return done(null, false);
            }catch(err){
                return done(err,false);
            }
        })
    );
};