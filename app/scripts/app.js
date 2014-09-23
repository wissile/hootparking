'use strict';

//noinspection JSHint
/**
 * @ngdoc overview
 * @name easyparkangularApp
 * @description
 * # easyparkangularApp
 *
 * Main module of the application.
 */
angular
    .module('easyparkangularApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ngAutocomplete'
    ])
    .config(function ($routeProvider) {
      //noinspection JSCheckFunctionSignatures
      $routeProvider
          .when('/main', {
            templateUrl: 'views/main.html',
            controller: ''
          }).when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
          }).when('/find', {
            templateUrl: 'views/find.html',
            controller: 'FindCtrl'
          }).when('/signup', {
            templateUrl: 'views/signup.html',
            controller: ''
          })
          .otherwise({
            redirectTo: '/home'
          });
    });
