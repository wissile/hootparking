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
    notification.find({ userId: userId }, function (err, users) {
        var user = users[0];
        console.log('hi this is uere'+users);
        console.log(datalist.data);
        console.log(datalist.value);
        if (datalist.data == 'ParkingSweeping')
            user.ParkingSweeping = datalist.value;
        if (datalist.data == 'ParkingClean')
            user.ParkingClean = datalist.value;
        if (datalist.data == 'TimeLimit')
            user.TimeLimit = datalist.value;
        if (datalist.data == 'ReachedBudget')
            user.ReachedBudget = datalist.value;
        if (datalist.data == 'ParkingFareChange')
            user.ParkingFareChange = datalist.value;
        if (datalist.data == 'ParkingTime')
            user.ParkingTime = datalist.value;
        user.save({ userId: userId }, datalist, function (err, userdt) {
            res.json(userdt);

        });

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
