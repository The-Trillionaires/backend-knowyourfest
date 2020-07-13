var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/user');
var userRouter = express.Router();
const passport = require('passport');
const authenticate = require('../authenticate.js');

/* GET users listing. */
userRouter.route('/login')
  .get(function(req, res, next) {
    res.render('login');
  })

  .post(function(req, res) {
    User.find({
      username: req.body.username
    }, function(err, user) {
      if (err) next(err)
      else {
        console.log(user[0].password, req.body.password);
        if (user != [] && "LOL" == req.body.password) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          var token = authenticate.getToken({
            _id: user[0]._id
          })
          headers = {
            "Authorization": "Bearer " + token
          }
          res = req.get("localhost:3000/users/login", headers=headers)
          res.json({
            success: true,
            token: token,
            status: "You are Successfully loged in"
          });
        } else {
          res.statusCode = 403;
          res.send("Wrong username or password");
        }
      }
    })
  })

userRouter.route('/signup')
  .get(function(req, res, next) {
    res.render('signup')
  })

  .post(function(req, res, next) {
    User.register(new User({
      username: req.body.username
    }), req.body.password, function(err, user) {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          err: err
        });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save(function(err, user) {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              err: err
            });
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: true,
              status: "Registration Successful"
            });
          }
        });

      }
    });
  })

module.exports = userRouter;
