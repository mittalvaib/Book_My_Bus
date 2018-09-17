const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');



/* GET home page. */
router.get('/buses', function(req, res, next) {
  req.Bus.find(function(err, busdata){
      if(err){
          res.send(err);
      }
      res.json(busdata);
  });
});


// find one bus from database 

router.get('/:id', function(req, res,next){
  req.Bus.find({id:req.params.id},{_id:0,__v:0}, function(err,bus){

   if(err){
        res.send(err);
    }
    res.json(bus);
 
    });
});

router.get('/city/:id', function(req, res,next){
  req.City.find({id:req.params.id}, function(err,city){

   if(err){
        res.send(err);
    }
    res.json(city);
 
    });
});




// save bus in data base 

router.post('/addbus', function(req, res, next){
 
  console.log("control in post method");

  var newbus= new req.Bus(req.body);
  req.Bus.count({}, function(err, n){
      if(err)
      console.log("error in saving "+ err);
      else{
        // newbus.id=n+1;
         newbus.save(function(err, bus){
                 if(err){
                   res.send(err);
                   }
                  res.json({success: true, msg:'Bus added'});;
                 });
           }
  });
});

// delete a bus from data base 

router.delete('/deletebus/:id', function(req, res,next){
    req.Bus.remove({id:req.params.id}, function(err,task){
   if(err){
        res.send(err);
    }
    console.log("bus data deleted");
    res.json(task);
    });
});

router.delete('/deletecity/:id', function(req, res,next){
    req.City.remove({id:req.params.id}, function(err,task){
   if(err){
        res.send(err);
    }
    console.log("city data deleted");
    res.json(task);
    });
});

// update a  bus from data base 
router.put('/updatebus/:id', function(req, res,next){
   
//   var updatedbook = new Book(req.body);
    console.log("id of bus is "+req.params.id);

     req.Bus.update({id:req.params.id}, { $set: { busnumber: req.body.busnumber, busdescription:req.body.busdescription, fromcity:req.body.fromcity,
         tocity: req.body.tocity, departuretime:req.body.departuretime, totalseats:req.body.totalseats,  fare:req.body.fare } }, function(err, bus){
      if(err){
         res.send(err);
        }
        console.log("bus is updated in database");
        res.json(bus);
     });
});

router.post('/addcity', function(req, res, next){
 
  //console.log("control in post method");
 
  var newcity= new req.City(req.body);
  req.City.count({}, function(err, n){
      if(err)
      console.log("error in saving "+ err);
      else{
         newcity.id=n+1;
         newcity.save(function(err, bus){
                 if(err){
                   res.send(err);
                   }
                  res.json({success: true, msg:'City added'});;
                 });
           }
  });
});

router.get('/cities/cities', function(req, res, next) {
  req.City.find(function(err, citydata){
      if(err){
          res.send(err);
      }
      res.json(citydata);
  });
});

router.put('/updatecity/:id', function(req, res,next){
   
//   var updatedbook = new Book(req.body);
    console.log("id of city is "+req.params.id);

     req.City.update({id:req.params.id}, { $set: { cityname: req.body.cityname, citydescription:req.body.citydescription } }, function(err, city){
      if(err){
         res.send(err);
        }
        console.log("city is updated in database");
        res.json(city);
     });
});



module.exports = router;