var express = require('express');
const bodyParser = require('body-parser');
const College_homepage = require('../models/college_homepage')
var home = express.Router();
var notifications = require('../models/notifications');

function remaing_days(a, b){
        // a should come before b in the sorted order
        if(parseInt(a.remaing_days) < parseInt(b.remaing_days)){
                return -1;
        // a should come after b in the sorted order
        }else if(parseInt(a.remaing_days) > parseInt(b.remaing_days)){
                return 1;
        // a and b are the same
        }else{
                return 0;
        }
}
/* GET home page. */
home.route("/")
.get(function(req,res,next){
  College_homepage.find(function(err,colleges){
    if(err) next(err)
    sorted_colleges = (colleges.sort(remaing_days))
    console.log(sorted_colleges);
    notifications.find({},function(err,notifications){
      if(err) next(err)
      console.log(sorted_colleges);
      res.render('home',{All_college:sorted_colleges,notification:notifications})
    })
  })
})

.post(function(req,res){
  res.redirect("/"+req.body.button);
})

module.exports = home;
