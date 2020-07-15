const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const adminRouter = express.Router();
const fests = require('../models/fests');
const College = require('../models/colleges')
const College_homepage = require("../models/college_homepage")
const authenticate = require('../authenticate');
const verifyCollege = require('../verifyCollege');
const notification = require('../models/notifications');

const app = express();
app.use(express.static("public"));

adminRouter.route("/")
.get(function(req,res,next){
  College.find({})
  .then(function(colleges){
    res.render("admin_home",{All_college:colleges});
  },function(err){next(err)})
  .catch(function(err){next(err)})
})

.post(function(req,res,next){
  if(req.body.edit!=null){
    url = "admin/"+req.body.edit;
    res.redirect(url);
  } else{
    College.find({_id:req.body.college},function(err,college){
      if(err) next(err)
        url = "admin/"+college[0].name;
        res.redirect(url);
    })
  }
})

adminRouter.route("/add_college")
.get(function(req,res,next){
  res.render('add_college')
})

.post(function(req,res,next){
  College.create(req.body)
  .then(function(colleges){
    return College_homepage.create(req.body)
  })
  .then(function(colleges){
    res.redirect('/admin')
  })
  .catch(function(err){next(err)})
})

.post(function(req,res,next){
  College.create(req.body,function(err,college){
    if(err) next(err)
    College_homepage.create(req.body,function(err,college){
      if(err) next(err)
      res.redirect("/admin")
    })
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
  console.log(delete_college);
  if (typeof(delete_college) == typeof(" ")){
    College.find({_id:delete_college},function(err,college){
      college_name = college[0].name;
      if(err) next(err);
      fests.deleteMany({college:college_name},function(err,result){
        if(err) next(err)
        College_homepage.deleteOne({name:college_name},function(err,result){
          if(err) next(err)
        })
      })
    })
    College.deleteOne({_id:delete_college},function(err,result){
      if(err) next(err)
    })
    res.redirect("/admin")
  } else{
    for(i=0;i<delete_college.length;i++){
      College.find({_id:delete_college[i]},function(err,college){
        if(err) next(err);
        else{
          console.log(college);
          college_name = college[0].name;
          console.log(college_name);
          College_homepage.deleteOne({name:college_name},function(err,result){
            if(err) next(err)
            console.log("College_homepage",result);
          })
          fests.deleteMany({college:college_name},function(err,result){
            console.log("fests",result);
            if(err) next(err)
          })
        }
      })
        College.deleteMany({_id:delete_college[i]},function(err,result){
          if(err) next(err)
        })
      }
        res.redirect("/admin")
  }

})


adminRouter.route("/edit_homepage")
.get(function(req,res,next){
  College_homepage.find()
  .then(function(college_homepage){
    res.render('edit_homepage',{all_college:college_homepage})
  })
})


 .post(function(req,res,next){
   College_homepage.find({_id:req.body.edit_college},function(err,college){
     if(err) next(err)
     url = "/admin/"+college[0].name+"/edit_homepage";
     res.redirect(url)
   });
 })

 adminRouter.route("/add_notification")
 .get(function(req,res,next){
   res.render('add_notification');
 })

 .post(function(req,res,next){
   notification.create(req.body)
   .then(function(result){
     console.log(result);
     res.redirect("/admin");
   },function(err){next(err)})
   .catch(function(err){next(err)})
 })

 adminRouter.route("/delete_notification")
 .get(function(req,res,next){
   notification.find()
   .then(function(notification){
     res.render('delete_notification',{notification:notification});
   },function(err){next(err)})
   .catch(function(err){next(err)})
 })

.post(function(req,res,next){
  if(typeof(req.body.delete)===typeof("")){
    notification.deleteOne({_id:req.body.delete},function(err,result){
      if(err) next(err)
  })
  res.redirect("/admin")
}
else{
  for(i=0;i<req.body.delete.length;i++){
    notification.deleteOne({_id:req.body.delete[i]},function(err,result){
      if(err) next(err)
    })
  }
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
    fests.deleteOne({_id: req.body.id,college: req.params.specific_college},function(err,result){
  })
}
else{
  for(i=0;i<req.body.delete_fest.length;i++){
    fests.deleteOne({_id: req.body.id[i],college: req.params.specific_college},function(err,result){
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
  fests.find({_id:req.body.id},function(err,college){
    url = "modify_fest/"+college[0].fest_name;
    res.redirect(url);
  })

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

adminRouter.route("/:specific_college/edit_homepage")
.get(verifyCollege.verifyCollege,function(req,res,next){
  res.render('edit_college_homepage',{College_name:req.params.specific_college});
})

.post(verifyCollege.verifyCollege,function(req,res,next){
  College_homepage.updateOne({name:req.params.specific_college},req.body,function(err,result){
    if(err) next(err)
    res.redirect("/admin/edit_homepage")
  })
})

module.exports = adminRouter;
