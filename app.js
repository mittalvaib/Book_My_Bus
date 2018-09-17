const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const User = require('./models/user');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();
var stripe = require("stripe")("sk_test_KKNt9dhw7pDOPwd3ZshC0VoA");

const users = require('./routes/users');
const admin = require('./routes/admin');
const booking = require('./routes/booking');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

var Schema = mongoose.Schema;
var busSchema = new mongoose.Schema({
                    id: Number,
                    busnumber: Number,
                    busdescription :String,
                    fromcity :String,
                    tocity : String,
                    departuretime: String,
                    totalseats: Number,
                    fare:Number
});


var Bus = mongoose.model('Bus', busSchema, 'bus');

app.use(function(req,res,next){
  req.Bus=Bus;
  next();
});
var bookingSchema = new mongoose.Schema({
                    busid: Number,
                    transid: Number,
                    busnumber:Number,
                    useremail: String,
                    fromcity :String,
                    tocity : String,
                    doj:String,
                    departuretime: String,
                    fare:Number,
                    quantity: Number,
                    totalfare:Number,
                    passenger1name:String,
                    passenger2name:String
});


var Booking = mongoose.model('Booking', bookingSchema, 'booking');

app.use(function(req,res,next){
  req.Booking=Booking;
  next();
});
var citySchema = new mongoose.Schema({
                   id: Number,
                   cityname:String,
                   citydescription:String
});


var City = mongoose.model('City', citySchema, 'city');

app.use(function(req,res,next){
  req.City=City;
  next();
});

app.use('/users', users);
app.use('/admin',admin);
app.use('/booking',booking);
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

// Index Route
/*app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});*/
app.get('/', function(req, res){
		res.render('index.ejs');
	});
  app.get('/profile', function(req, res){
		res.render('profile.ejs');
	});

  /*app.post('/charge', function(req, res){
     var token = req.body.stripeToken;
     var chargeamount = req.body.chargeamount;
     var charge = stripe.charges.create({
       amount:chargeamount,
       currency:"inr",
       source:token
     },function(err, charge){
       if(err & err.type=="StripeCardError"){
         console.log("Your card was declined");
       }
       else {
      res.json({success: true, msg:'User registered'});
     }

      } );
		res.redirect('/profile');
	});*/


// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});

app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('http://localhost:4200/userpage', 
    passport.authenticate('google'),(req, res, next)=>{
     res.json({user: req.user});
  });

  var nodemailer = require('nodemailer');

app.post('/sendmail', (req, res)=>{
  var email = req.body.email;
  var message = req.body.message;
let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'deepakkanojia2810@gmail.com',
    pass: 'mmdk2814'
  },
  tls: {
    rejectUnauthorized: false
  }
});

let HelperOptions = {
  from: '"Deepak" <deepakkanojia@gmail.com',
  to: email,
  subject: 'Book My Bus',
  text: message
};



  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
     res.json({success: true, msg:'message sent'});
    console.log("The message was sent!");
    console.log(info);
  });
});

   


                                     

module.exports = app;
