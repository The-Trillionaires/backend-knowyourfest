const mongoose = require('mongoose');
const College = require('./models/colleges');

exports.verifyCollege = function(req,res,next){
College.find({name: req.params.specific_college})
.then(function(colleges){
  console.log(colleges);
  if(colleges.length == 0){
    var err = new Error("This College is not Supported on this website");
    err.statusCode = 404;
    next(err);
  } else{
    next()
  }
})
}
