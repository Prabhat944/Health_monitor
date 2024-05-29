const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

//connected database
connectDB();

//Init middleware
app.use(express.json({extended:true}));

//Initialize Passport
app.use(passport.initialize());
require("./config/passport")(passport);


//Define Routes
app.use("/api/auth", require('./routes/authRoutes'));


//Static file
app.use(express.static("public"));


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})