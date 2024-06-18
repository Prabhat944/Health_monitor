const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");
const { engine }  = require('express-handlebars');
const path = require("path")
require("dotenv").config();

const app = express();

//connected database
connectDB();

//Init middleware
app.use(express.json({extended:true}));

// Set up Handlebars as the template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Initialize Passport
app.use(passport.initialize());
require("./config/passport")(passport);


//Define Routes
app.use("/api/auth", require('./routes/authRoutes'));
app.use('/api/health', require('./routes/healthRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

//Static file
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('dashboard');
  });
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
  });
app.get('/addPatient', (req, res) => {
  res.render('addPatient');
  });
app.get('/viewPatients', (req, res) => {
  res.render('viewPatients');
});
app.get('/moniterPatient/:id', (req, res) => {
  res.render('moniterPatient', { id: req.params.id });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})