/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var httpProxy = require('http-proxy');
var express = require('express');
module.exports = function (app) {

    var proxy = httpProxy.createProxyServer({});


    // Insert routes below
    app.use('/api/users', require('./api/user'));
    app.use('/api/notification', require('./api/notification'));
    app.use('/api/feedback', require('./api/feedback'));

    app.use('/auth', require('./auth'));

    // Insert routes below
    app.use('/api/users', require('./api/user'));
    app.use('/api/notification', require('./api/notification'));

    app.use('/auth', require('./auth'));

    app.use(express.static('./Images'));
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

    app.all('/sfpark/rest/*', function (req, res) {
        proxy.web(req, res, { target: 'http://api.sfpark.org' });
    });

    // All other routes should redirect to the index.html
        app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};
