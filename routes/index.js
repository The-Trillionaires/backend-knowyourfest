var express = require('express');
const bodyParser = require('body-parser');
const College = require('../models/colleges')
var home = express.Router();

/* GET home page. */
home.route("/")
.get(function(req,res){
  College.find({})
  .then(function(colleges){
    res.render('home',{route:"",All_college: colleges});
  })
})

.post(function(req,res){
  res.redirect("/"+req.body.button);
})

module.exports = home;
