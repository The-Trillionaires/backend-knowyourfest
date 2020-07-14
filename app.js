var authenticate = require('./authenticate');
var express = require('express');
const path = require('path');
var ejs = require('ejs');
var mongoose = require('mongoose');
const passport = require('passport');

var app = express();

var url = "mongodb://localhost:27017/collegedb"
var connect = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true  });

// view engine setup
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static("node_modules"));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var festsRouter = require('./routes/festsRouter');
var adminRouter = require('./routes/adminRouter');
var userRouter = require('./routes/users');


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fests', festsRouter);
app.use('/admin',adminRouter);


app.listen('3000',function(err){
  if(err){console.log(err);}
  else{console.log("Server has started at port 3000");}
})
