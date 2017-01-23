'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var multer = require('multer');
var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
//var upload = multer({ //multer settings
//    storage: storage
//}).single('file');

//var Imagename;
//var storage = multer.diskStorage({ //multers disk storage settings
//    destination: function (req, file, cb) {
//        console.log('file destination data here' + file);
//        cb(null, '/Images');
//    },
//    filename: function (req, file, cb) {
//        console.log('file' + file);
//       
//        console.log('file data here' + file);
//        Imagename = 'Tulig' + '.' + "jpg";
//        cb(null, Imagename);

//        // cb(null, file.originalname);

//    }
//});

//exports.imageUpload = ('/upload', function (req, res) {
//    var Imagename;
//    console.log('hi upload function' + req.params.id);
//    Imagename = req.params.id;

//    var upload = multer({ //multer settings
//        storage: storage
//    }).single('file');

//    var storage = multer.diskStorage({ //multers disk storage settings
//        destination: function (req, file, cb) {
//            console.log('file destination data here' + file);
//            cb(null, '/Images/');
//            cb(new Error('I don\'t have a clue!'))
//        },
//        filename: function (req, file, cb) {
//            console.log('file' + file);

//            console.log('file data here' + file);
//            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
//            Imagename = 'Tulig' + '.' + "jpg";
//            cb(null, Imagename);
//            cb(new Error('I don\'t have a clue!'))
//            // cb(null, file.originalname);

//        }
//    });
var Imagename; 
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        console.log('file here' + file);
        cb(null, './server/Images/');
    },
    filename: function (req, file, cb) {
        console.log('Filename here' + Imagename);
        var datetimestamp = Date.now();
        Imagename = Imagename + '.' + "jpg";
        cb(null, Imagename);
        
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
var Imagename; 
exports.imageUpload = ('/upload', function (req, res) {
    Imagename = req.params.id;
    console.log('hi upload function' + req.params.id);
    upload(req, res, function (err) {
        console.log('Error is here' + err);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null, Image: Imagename });
    });
});

exports.index = function (req, res) {
        User.find({}, '-salt -hashedPassword', function (err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};
exports.updateFbUser = function (req, res, next) {
    var decodedDatalist = decodeURIComponent(req.params.data);
    var datalist = JSON.parse(decodedDatalist);
    console.log('Update _id' + datalist._id);
    console.log('Update id' + datalist.id);    
    User.findOne({ _id: datalist._id }, function (err, user) {
        console.log('Update user' + user);
        datalist.hashedPassword = user.encryptPassword(datalist.password);
        User.update({ id: datalist.id }, datalist, function (err, userdt) {
            console.log('UserDt Herer' + userdt);
            res.json(userdt);
        });
    });
};
exports.updateUser = function (req, res, next) {
    var decodedDatalist = decodeURIComponent(req.params.data);
    var datalist = JSON.parse(decodedDatalist);
    console.log('Update _id' + datalist._id);
    console.log('Update id' + datalist.id);
    User.findById(datalist.id, function (err, user) {
        console.log('Update user' + user);
        if (datalist.password) {
            datalist.hashedPassword = user.encryptPassword(datalist.password);
        }
        User.update({ _id: datalist.id }, datalist, function (err, userdt) {
            console.log('UserDt Herer' + userdt);
            res.json(userdt);
        });
    });
};
/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
    User.findOne({ 'email': req.body.email }, function (err, user) {
        console.log(req.params.email);
        console.log('user is exit' + user);
        if (!user) {
            var newUser = new User(req.body);
            newUser.provider = 'local';
            newUser.role = 'user';
            newUser.save(function (err, user) {
                if (err) return validationError(res, err);
                var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
                res.json({ token: token, user: user });
            });
        }
        else {
            var UserAvailable = true;
            res.json({ 'UserAvailable': true });
        }
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
    console.log('Forgot password user here'+user);
        if (user === null) {
            var userNotFound = true;
            console.log(userNotFound);
            res.json({ 'userNotFound': true });
        }
        if (user !== null)
            if (user.userType === 'Facebook') {
                if (user.userType ==='Facebook')
                    res.json(user.userType);
            }
            else {
                User.findById(user._id, function (err, user) {
                    console.log('Forgot password user here 2nd' + user);
                    var hashedPassword = user.encryptPassword('Password1');
                    User.update({ _id: user._id }, { 'hashedPassword': hashedPassword }, function (err, userdt) {
                        console.log('user given by updaing'+userdt);
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
                            console.log('Message send successfully' + user);
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

