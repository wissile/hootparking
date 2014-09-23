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
      'ngAutocomplete',
      'backButton'
    ])
    .config(function ($routeProvider) {
      //noinspection JSCheckFunctionSignatures
      $routeProvider
          .when('/main', {
            title: 'Main',
            templateUrl: 'views/main.html',
            controller: ''
          }).when('/home', {
            title: 'Search Parking',
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
          }).when('/find', {
            title: 'Find my Car',
            templateUrl: 'views/find.html',
            controller: 'FindCtrl'
          }).when('/signup', {
            title: 'Account',
            templateUrl: 'views/signup.html',
            controller: ''
          }).when('/stats', {
            title: 'Parking Stats',
            templateUrl: 'views/stats.html',
            controller: ''
          }).when('/profile', {
            title: 'Profile',
            templateUrl: 'views/profile.html',
            controller: ''
          })
          .otherwise({
            redirectTo: '/home'
          });
    })

    .run(['$location', '$rootScope', function($location, $rootScope) {
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
      });
    }]);
