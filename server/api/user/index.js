'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:data', auth.isAuthenticated(), controller.updateUser);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/fbuser/:fbdata', controller.createFbUser);
router.put('/fbuserupdate/:data', auth.isAuthenticated(), controller.updateFbUser);
router.post('/forgetpassword/:email', controller.forgetPassword);
router.post('/upload/:id',controller.imageUpload);
//fbuserupdate

module.exports = router;
