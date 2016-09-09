'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
        User.find({}, '-salt -hashedPassword', function (err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};
exports.updateUser = function (req, res, next) {
    var decodedDatalist = decodeURIComponent(req.params.data);
    var datalist = JSON.parse(decodedDatalist);

    // datalist.hashedPassword = encryptPassword(datalist.password); 
    User.findById(datalist.id, function (err, user) {
        datalist.hashedPassword = user.encryptPassword(datalist.password);
        console.log(datalist.hashedPassword);

        // var dob = String(datalist.dob); 

        console.log(datalist.dob);
        User.update({ _id: datalist.id }, datalist, function (err, userdt) {
            res.json(userdt);
        });
    });
};
/**
 * Creates a new user
 */
exports.create = function (req, res, next) 
{
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token,user:user });
  });
};

/**
 * Get a single user
 */

/**
* Forget Password
*/
exports.forgetPassword = function (req, res, next) {
    User.findOne({ email: req.params.email }, function (err, user) {
        if (user.userType) {
            if (user.userType == 'Facebook')
                res.json(user.userType);
        }
        else {
            User.findById(user._id, function (err, user) {
               var hashedPassword = user.encryptPassword('Password1');
                User.update({ _id: user._id }, { 'hashedPassword': hashedPassword }, function (err, userdt) {
                    
                    console.log(userdt);
                    var subject = "";
                    var text = "";
                    subject = "Forget Password Request";
                    text = "Dear user" +
                    "<br/><br/><br />" +
                    "<table style='border-collapse: collapse'>" +
                    "<tr><td ><b>User Name</b> : " + req.params.email + "</td></tr>" +
                    "<tr><td ><b>Password</b> : " + 'Password1' + "</td></tr>" +
                    "</table>" +
                    "<br /><br />" +
                    "<br /><br />" +
                    "Sincerely," +
                  "<br /><br /><br />" +
                  "The Hootparking Team";

                    var msg = {
                        transport: nodemailer.createTransport('SMTP', {
                            host: 'smtp.gmail.com',
                            secureConnection: true,
                            port: 465,
                            auth: {
                                user: "dev.net.asp@gmail.com",
                                pass: "Wel@come123"
                            }
                        }),
                        html: text,
                        from: "info@cns.com",
                        subject: subject,
                        to: req.params.email
                    };
                    msg.transport.sendMail(msg, function (err) {
                        if (err) {
                            console.log('Sending to ' + msg.to + ' failed: ' + err);
                        }
                        console.log('Sent to ' + msg.to);
                        msg.transport.close();
                        res.json(msg.to);
                    });
                });
            });
        }
    });
};


/** 
* Creates a new fbuser 
*/
exports.createFbUser = function (req, res, next) {
    var decodedDatalist = decodeURIComponent(req.params.fbdata);
    var datalist = JSON.parse(decodedDatalist);
    User.findOne({ id: datalist.id }, function (err, user) {
        if (!user) {
            datalist.provider = 'local';
            datalist.hashedPassword = 'facebook';
            console.log(datalist);
            var newUser = new User(datalist);
            newUser.save(function (err, user) {
                if (err) {
                    res.json({ err: err });
                } else {
                    var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresinminutes: 60 * 5 });
                    res.json({ token: token, user: user });
                }
            });
        }
        else {
            var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresinminutes: 60 * 5 });
            res.json({ token: token, user: user });
        }
    });
};
/** 
* Creates a new fbuser end 
*/
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

