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
          }).when('/search', {
            templateUrl: 'views/search.html',
            controller: 'MainCtrl'
          })
          .otherwise({
            redirectTo: '/search'
          });
    });
