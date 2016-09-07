'use strict';

var should = require('should');
var app = require('../../app');
var Notification = require('./notification.model');

//var user = new User({
//  provider: 'local',
//  name: 'Fake User',
//  email: 'test@test.com',
//  password: 'password'
//});
var post = new Notification({
    provider: 'local',
    Sweep: 0,
    Clean: 0, 
  TimeLimit: 0,
  userId:this._id
 });

//save model to MongoDB
post.save(function (err) {
  if (err) {
		return err;
  }
  else {
  	console.log("Post saved");
  }
});

//describe('User Model', function() {
//  before(function(done) {
//    // Clear users before testing
//    User.remove().exec().then(function() {
//      done();
//    });
//  });

//  afterEach(function(done) {
//    User.remove().exec().then(function() {
//      done();
//    });
//  });

//  it('should begin with no users', function(done) {
//    User.find({}, function(err, users) {
//      users.should.have.length(0);
//      done();
//    });
//  });

//  it('should fail when saving a duplicate user', function(done) {
//    user.save(function() {
//      var userDup = new User(user);
//      userDup.save(function(err) {
//        should.exist(err);
//        done();
//      });
//    });
//  });

//  it('should fail when saving without an email', function(done) {
//    user.email = '';
//    user.save(function(err) {
//      should.exist(err);
//      done();
//    });
//  });

//  it("should authenticate user if password is valid", function() {
//    return user.authenticate('password').should.be.true;
//  });

//  it("should not authenticate user if password is invalid", function() {
//    return user.authenticate('blah').should.not.be.true;
//  });
//});
