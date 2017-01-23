'use strict';

var express = require('express');
var controller = require('./feedback.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.get('/me', auth.isAuthenticated(), controller.me);
//router.get('/me1', auth.isAuthenticated(), controller.changePassword);
router.post('/:data',controller.create);
//router.get('/:id', auth.isAuthenticated(), controller.show);
//router.put('/:setting', controller.Update);
//router.get('/',auth.isAuthenticated, controller.show);

module.exports = router;
