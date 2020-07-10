const fests = require('../models/fests')
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var festsRouter = express.Router();

festsRouter.route("/")
.post(function(req,res,next){
  if(req.body.route == "admin"){
    url = "admin/"+req.body.button;
    res.redirect(url);
  }else{
    url = "fests/"+req.body.button;
    res.redirect(url);
  }

})

festsRouter.route("/:specific_college")
.get(function(req,res,next){
  fests.find({college:req.params.specific_college})
  .then(function(fests){
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html')
    res.render("fests_info",{fests:fests,College_name:req.params.specific_college});
  },function(err){next(err);})
  .catch(function(err){next(err);})
})

festsRouter.route("/:specific_college/:specific_event")
.get(function(req,res,next){
  fests.find({fest_name:req.params.specific_event})
  .then(function(fests){
    res.render("pict",{Pict_fests:fests});
  },function(err){next(err);})
  .catch(function(err){next(err);})
})

module.exports = festsRouter;
