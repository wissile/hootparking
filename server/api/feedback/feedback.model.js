'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');


  var FeedbackSchema = new mongoose.Schema({
  userId : String,
  feedbackDetails:  String, 
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta:
  {
    votes: Number,
    favs:  Number
  }
});

module.exports = mongoose.model('feedback', FeedbackSchema)

