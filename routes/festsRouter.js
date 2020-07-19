const fests = require('../models/fests');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var festsRouter = express.Router();
const verifyCollege = require('../verifyCollege');
const Colleges = require('../models/colleges');
const sortCollege = require('../sortCollege');

festsRouter.route("/:specific_college")
.get(verifyCollege.verifyCollege,function(req,res,next){
  fests.find({college:req.params.specific_college})
  .then(function(fests){
    update = sortCollege.update_remainingdays(fests,'fests')
    Colleges.find({name:req.params.specific_college},function(err,college){
      res.statusCode = 200;
      res.setHeader('Content-Type','text/html')
      sorted_colleges = (fests.sort(sortCollege.remaing_days))
      res.render("college_fest",{fests:fests,College_name:req.params.specific_college,College_short_name: college[0].short_name});
    })
  },function(err){next(err);})
  .catch(function(err){next(err);})
})

festsRouter.route("/:specific_college/:specific_event")
.get(verifyCollege.verifyCollege,function(req,res,next){
  fests.find({fest_name:req.params.specific_event})
  .then(function(fests){
    res.render("pict",{Pict_fests:fests});
  },function(err){next(err);})
  .catch(function(err){next(err);})
})

module.exports = festsRouter;
