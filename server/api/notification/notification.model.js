'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

//var NotificationSchema = new Schema({
//    timelimit: Boolean,
//    sweeping: Boolean,
//    cleaning: Boolean
//},{ collection: 'NotificationSetting' });

//NotificationSchema
//  6.path('id',function (value, respond) {
//      var self = this;
//      this.constructor.findOne(function (err, user) {
//          if (err) throw err;
//          if (user) {
//              console.log(user);
//              return user;
//          }
//          respond(true);
//      });
//    var validatePresenceOf = function (value) {
//    return value && value.length;
//    };

  var NotificationSchema = new mongoose.Schema({
  userId:String,
  ParkingSweeping:  Boolean,
  ParkingClean: Boolean,
  TimeLimit: Boolean,
  ReachedBudget:Boolean,
  ParkingFareChange:Boolean,
  ParkingTime:Boolean,
  SpendingBudget:String,
  ParkingTimeReminder:String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta:
  {
    votes: Number,
    favs:  Number
  }
});
module.exports = mongoose.model('NotificationSetting', NotificationSchema)

