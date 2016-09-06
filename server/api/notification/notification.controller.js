'use strict';

var notification = require('./notification.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};
/**
 * Get list of users
 * restriction: 'admin'
 */
exports.create = function (req, res, next) 
{
    var newUser = new notification({ Sweep: 0, Clean: 0,
        TimeLimit:0
    });
    newUser.save(function (err, user) {
        if (err) return validationError(res, err);
        console.log(user);
        res.json(user);
    });
};
//exports.me = function (req, res, next) {
//    debugger;
//    var userId = req.notification._id;
//    User.findOne({
//        _id: userId
//    }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
//        if (err) return next(err);
//        if (!user) return res.json(401);
//        res.json(user);
//    });
//};

exports.changePassword = function (req, res, next) {
    User.find(function (err, user) {
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
