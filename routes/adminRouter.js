const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const adminRouter = express.Router();
const fests = require('../models/fests');
const College = require('../models/colleges')
const authenticate = require('../authenticate');
const verifyCollege = require('../verifyCollege');

adminRouter.route("/")
.get(function(req,res,next){
  College.find({})
  .then(function(colleges){
    res.render("admin_home",{All_college:colleges});
  },function(err){next(err)})
  .catch(function(err){next(err)})
})

.post(function(req,res,next){
  url = "admin/"+req.body.button;
  res.redirect(url);
})

adminRouter.route("/add_college")
.get(function(req,res,next){
  res.render('add_college')
})

.post(function(req,res,next){
  College.create(req.body,function(err,college){
    res.redirect("/admin")
  })
})

adminRouter.route("/remove_college")
.get(function(req,res,next){
  College.find({})
  .then(function(colleges){
    res.render('remove_college',{All_college: colleges});
  },function(err){next(err)})
  .catch(function(err){next(err)})
})

.post(function(req,res,next){
  delete_college = req.body.delete_college;
  if (typeof(delete_college) == typeof(" ")){
    College.deleteOne({name:delete_college},function(err,result){
      if(err) next(err)
    })
    fests.deleteMany({college:delete_college},function(err,result){
      if(err) next(err)
    })
    res.redirect("/admin")
  } else{
    for(i=0;i<delete_college.length;i++){
        College.deleteOne({name:delete_college[i]},function(err,result){
          if(err) next(err)
        })
        fests.deleteMany({college:delete_college[i]},function(err,result){
          if(err) next(err)
        })
      }
        res.redirect("/admin")
  }

})

adminRouter.route("/:specific_college")
.get(verifyCollege.verifyCollege,function(req,res,next){
  res.render('admin_options',{College_name:req.params.specific_college});
})

.post(verifyCollege.verifyCollege,function(req,res,next){
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
.get(verifyCollege.verifyCollege,function(req,res,next){
  res.render("add_fest",{College_name:req.params.specific_college});
})

.post(verifyCollege.verifyCollege,function(req,res,next){
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
.get(verifyCollege.verifyCollege,function(req,res,next){
  fests.find({college: req.params.specific_college},function(err,fests){
    if(err) console.log(err);
    res.render('remove_fest',{College_name:req.params.specific_college,All_fest: fests});
  })
})

.post(verifyCollege.verifyCollege,function(req,res,next){
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
.get(verifyCollege.verifyCollege,function(req,res,next){
  fests.find({college: req.params.specific_college},function(err,fests){
    if(err) console.log(err);
    res.render('modify_fest',{College_name:req.params.specific_college,All_fest: fests});
  })
})

.post(verifyCollege.verifyCollege,function(req,res,next){
  url = "modify_fest/"+req.body.modify_fest;
  res.redirect(url)
})



adminRouter.route("/:specific_college/modify_fest/:specific_event")
.get(verifyCollege.verifyCollege,function(req,res,next){
  fests.find({college: req.params.specific_college,fest_name: req.params.specific_event})
  .then(function(fest){
    res.render("modify_specific_fest",{College_name:req.params.specific_college,festname:req.params.specific_event,fests:fest});
  },function(err){next(err);})
  .catch(function(err){next(err);})
})

.post(verifyCollege.verifyCollege,function(req,res,next){
  fests.updateOne({college: req.params.specific_college,fest_name: req.params.specific_event},req.body)
  .then(function(){
    url = "/admin/"+req.params.specific_college+"/modify_fest";
    res.redirect(url);
  })
})

module.exports = adminRouter;
