var express = require('express');
const bodyParser = require('body-parser');
var home = express.Router();

/* GET home page. */
home.route("/")
.get(function(req,res){
  res.render('home',{route:""});
})

.post(function(req,res){
  res.redirect("/"+req.body.button);
})

module.exports = home;
