const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
    gender: req.body.gender,
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByemail( email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobile: user.mobile,
            gender: user.gender
           }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
    
  });
});

router.get('/:fromcity&:tocity', function(req, res,next){
  req.Bus.find({fromcity:req.params.fromcity,tocity:req.params.tocity}, function(err,bus){

   if(err){
        res.send(err);
    }
    res.json(bus);
 
    });
});
router.delete('/deleteuser/:email', function(req, res,next){
    User.remove({email:req.params.email}, function(err,task){
   if(err){
        res.send(err);
    }
    console.log("booking is canceled");
    res.json(task);
    });
});

  /* ============================================================
     Route to check if user's email is available for registration
  ============================================================ */
  router.get('/checkEmail/:email', (req, res) => {
      // Search for user's e-mail in database;
      User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's e-mail is taken
          if (user) {
            res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
          } else {
            res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
          }
        }
      });
  });
  


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
