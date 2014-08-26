'use strict';

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
    $routeProvider
      .when('/main', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).when('/search', {
            templateUrl: 'views/search.html',
            controller: ''
        })
      .otherwise({
        redirectTo: '/main'
      });
  });
