const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
//const User = require('../models/user');


router.post('/addbooking', function(req, res, next){
 
  console.log("control in post method");

  var newbooking= new req.Booking(req.body);
  req.Booking.count({}, function(err, n){
      if(err)
      console.log("error in saving "+ err);
      else{
         newbooking.transid=n+1;
         newbooking.save(function(err, booking){
                 if(err){
                   res.send(err);
                   }
                  res.json({success: true, msg:'Bus added'});;
                 });
           }
  });
});

router.delete('/deletebooking/:transid', function(req, res,next){
    req.Booking.remove({transid:req.params.transid}, function(err,task){
   if(err){
        res.send(err);
    }
    console.log("booking is canceled");
    res.json(task);
    });
});

router.get('/:useremail', function(req, res,next){
req.Booking.find({useremail:req.params.useremail}, function(err,booking){

   if(err){
        res.send(err);
    }
    res.json(booking);
 
    });
});

router.get('/getbooking/bookings', function(req, res, next) {
  req.Booking.find(function(err, bookingdata){
      if(err){
          res.send(err);
      }
      res.json(bookingdata);
  });
});






module.exports = router;