const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const adminRouter = express.Router();
const fests = require('../models/fests')

adminRouter.route("/")
.get(function(req,res,next){
  res.render("home",{route:"admin"});
})

adminRouter.route("/:specific_college")
.get(function(req,res,next){
  res.render('admin_options',{College_name:req.params.specific_college});
})
.post(function(req,res,next){
  if(req.body.button == "Add"){
    url = req.params.specific_college+"/add_fest"
    res.redirect(url)
  } else if(req.body.button == "Delete"){
    url = req.params.specific_college+"/remove_fest"
    res.redirect(url)
  } else if(req.body.button == "Modify"){
    url = req.params.specific_college+"/modify_fest"
    res.redirect(url)
  }
})

adminRouter.route("/:specific_college/add_fest")
.get(function(req,res,next){
  res.render("add_fest",{College_name:req.params.specific_college});
})

.post(function(req,res,next){
  fest = req.body
  fest.fest_name = fest.fest_name
  fest.college = req.params.specific_college;
  fests.create(fest)
  .then(function(fest){
    return fests.find({college: req.params.specific_college})
  })
  .then(function(fests){
    res.render("fests_info",{College_name: req.params.specific_college,fests:fests})
  },function(err){next(err);})
  .catch(function(err){next(err);})
})

adminRouter.route("/:specific_college/remove_fest")
.get(function(req,res,next){
  fests.find({college: req.params.specific_college},function(err,fests){
    if(err) console.log(err);
    res.render('remove_fest',{College_name:req.params.specific_college,All_fest: fests});
  })
})

.post(function(req,res,next){
  if(typeof(req.body.delete_fest)===typeof("")){
    fests.deleteOne({fest_name: req.body.delete_fest,college: req.params.specific_college},function(err,result){
  })
}
else{
  for(i=0;i<req.body.delete_fest.length;i++){
    fests.deleteOne({fest_name: req.body.delete_fest[i],college: req.params.specific_college},function(err,result){
    })
  }
}

fests.find({college:req.params.specific_college})
.then(function(all_fests){
  res.render("fests_info",{fests:all_fests,College_name:req.params.specific_college});
},function(err){next(err);})
.catch(function(err){next(err);})
})

adminRouter.route("/:specific_college/modify_fest")
.get(function(req,res,next){
  fests.find({college: req.params.specific_college},function(err,fests){
    if(err) console.log(err);
    res.render('modify_fest',{College_name:req.params.specific_college,All_fest: fests});
  })
})

.post(function(req,res,next){
  url = "modify_fest/"+req.body.modify_fest;
  res.redirect(url)
})



adminRouter.route("/:specific_college/modify_fest/:specific_event")
.get(function(req,res,next){
  fests.find({college: req.params.specific_college,fest_name: req.params.specific_event})
  .then(function(fest){
    res.render("modify_specific_fest",{College_name:req.params.specific_college,festname:req.params.specific_event,fests:fest});
  },function(err){next(err);})
  .catch(function(err){next(err);})
})

.post(function(req,res,next){
  fests.updateOne({college: req.params.specific_college,fest_name: req.params.specific_event},req.body)
  .then(function(){
    url = "/admin/"+req.params.specific_college+"/modify_fest";
    res.redirect(url);
  })
})

module.exports = adminRouter;
