const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');


exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
  console.log("Get token: ",user);
  return jwt.sign(user, "12345",
  {expiresIn: 3600}) //in seconds
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //It is used to extract the token from the Auth Header
opts.secretOrKey = "12345";

exports.jwtPassport = passport.use(new JwtStrategy(opts,
   function(jwt_payload, done){  //done is the callback function when we use a different Strategy it contains information
     console.log("Jwt_payload: ",jwt_payload);   // Which can be displayed on the client side
     User.findOne({_id: jwt_payload._id},function(err,user){
       if(err) {return done(err,false);}
       else if(user){
         return done(null,user);
       } else{
         return done(null,false);
       }
     });
   }));

exports.verifyUser = passport.authenticate('jwt',{session:false});

exports.verifyAdmin = function(req,res,next){
  if(req.user.admin!=true){
    var err = new Error("You are not authenticated for this operation");
        err.statusCode = 403;
    next(err);
  }
  else{next()}
}
