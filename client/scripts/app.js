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
      'backButton',
      'config'
    ])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
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
          }).when('/account', {
            title: 'Account',
            templateUrl: 'views/account.html',
            controller: 'AccountCtrl',
            authenticate: true
          }).when('/login', {
            title: 'Login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
          }).when('/signup', {
            title: 'Sign up',
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl'
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
        //$locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location, ENV) {
      return {
        // Add authorization token to headers
        request: function (config) {
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
          }
          if(_.contains(config.url, '/api') || _.contains(config.url, '/auth') || _.contains(config.url, '/sfpark/rest/')){
            config.url = ENV.apiEndpoint + config.url;
          }

          return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
          if(response.status === 401) {
            $location.path('/login');
            // remove any stale tokens
            $cookieStore.remove('token');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    })

    .run(function ($location, $rootScope, Auth) {
      $rootScope.$on('$routeChangeSuccess', function (event, next) {
        $rootScope.title = next.$$route.title;

        // Redirect to login if route requires auth and you're not logged in
        Auth.isLoggedInAsync(function(loggedIn) {
          if (next.authenticate && !loggedIn) {
            $location.path('/login');
          }
        });
      });
    });
