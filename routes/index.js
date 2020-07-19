var express = require('express');
const bodyParser = require('body-parser');
const College_homepage = require('../models/college_homepage')
var home = express.Router();
var notifications = require('../models/notifications');
var sortCollege = require('../sortCollege');
var verifyCollege = require('../verifyCollege');
/* GET home page. */
home.route("/")
.get(function(req,res,next){
  College_homepage.find(function(err,colleges){
    var today = new Date()
    update = sortCollege.update_remainingdays(colleges,'college')
    if(err) next(err)
    sorted_colleges = (colleges.sort(sortCollege.remaing_days))
    notifications.find({},function(err,notifications){
      if(err) next(err)
      res.render('home',{All_college:sorted_colleges,notification:notifications})
    })
  })
})

.post(verifyCollege.verifyCollege,function(req,res){
  res.redirect("/"+colleges[i].button);
})

module.exports = home;
