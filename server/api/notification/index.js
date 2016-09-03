'use strict';

var express = require('express');
var controller = require('./notification.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.get('/me', auth.isAuthenticated(), controller.me);
//router.get('/me1', auth.isAuthenticated(), controller.changePassword);
router.post('/', controller.create);
//router.get('/',auth.isAuthenticated, controller.show);

module.exports = router;
