'use strict';

var feedback = require('./feedback.model');
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



exports.create = function (req, res, next) {
    var decodedDatalist = decodeURIComponent(req.params.data);
      var datalist = JSON.parse(decodedDatalist);
      var userId = datalist.id;
    var name = datalist.feedback;
        var newFeedback = new feedback({
        userId: userId,
        feedbackDetails: name
    });
    newFeedback.save(function (err, user) {
        if (err) return validationError(res, err);
        console.log(user);
        res.json(userId);
    });
};





/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
