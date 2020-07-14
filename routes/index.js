var express = require('express');
const bodyParser = require('body-parser');
const College_homepage = require('../models/college_homepage')
var home = express.Router();
var notifications = require('../models/notifications');

/* GET home page. */
home.route("/")
.get(function(req,res,next){
  College_homepage.find(function(err,colleges){
    if(err) next(err)
    notifications.find(function(err,notification){
      if(err) next(err)
      res.render("home",{All_college:colleges,notification:notification});
    })
  })
})

.post(function(req,res){
  res.redirect("/"+req.body.button);
})

module.exports = home;
