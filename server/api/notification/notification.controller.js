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
exports.show = function (req, res, next) {
    var userId = req.params.id;
    notification.find({ userId: userId }, function (err, notificationSetting) {
       res.json(notificationSetting);
    });
    //res.json(userId);
};
exports.create = function (req, res, next) {
    var userId = req.params.id;
    var newUser = new notification({ 
        ParkingSweeping: 0,
        ParkingClean: 0,
        TimeLimit: 0,
        ReachedBudget: 0,
        ParkingFareChange: 0,
        ParkingTime: 0,
        userId: userId
    });
    newUser.save(function (err, user) {
        if (err) return validationError(res, err);
        console.log(user);
        res.json(userId);
    });
};


exports.Update = function (req, res, next) {
    var decodedDatalist = decodeURIComponent(req.params.setting);
    var datalist = JSON.parse(decodedDatalist);
    console.log(req.params.setting);
    var userId = datalist.userId;
    notification.findOne({ userId: userId }, function (err, users) {
        //var user = users[0];
        if (users) {
            console.log('hi this is uere' + users);
            console.log(datalist.data);
            console.log(datalist.value);
            if (datalist.data === 'ParkingSweeping')
                users.ParkingSweeping = datalist.value;
            if (datalist.data === 'ParkingClean')
                users.ParkingClean = datalist.value;
            if (datalist.data === 'TimeLimit')
                users.TimeLimit = datalist.value;
            if (datalist.data === 'ReachedBudget')
                users.ReachedBudget = datalist.value;
            if (datalist.data === 'ParkingFareChange')
                users.ParkingFareChange = datalist.value;
            if (datalist.data === 'ParkingTime')
                users.ParkingTime = datalist.value;
            users.save({ userId: userId }, datalist, function (err, userdt) {
                res.json(userdt);

            });
        }
        else {
            console.log(err);
        }
    });

    //User.update({ "id": userId }, { $set: { "lastname": "konde"} });
    //res.json(datalist);
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
    User.find(function (err, user) {   // jshint ignore:line
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
