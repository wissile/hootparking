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
      'ui.router',
      'ngSanitize',
      'ngTouch',
      'ngAutocomplete',
      'backButton',
        'ngMaterial',
      'config'
    ])
    .config(function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
      //noinspection JSCheckFunctionSignatures

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
          url: '/home',
          title: 'Home',
          templateUrl: 'views/home.html',
          controller: 'MainCtrl'
        }).state('find', {
          url: '/find',
          title: 'Find my Car',
          templateUrl: 'views/find.html',
          controller: 'FindCtrl'
        }).state('account', {
          url: '/account',
          title: 'Account',
          templateUrl: 'views/account.html',
          controller: 'AccountCtrl',
          authenticate: true
        }).state('login', {
          url: '/login',
          title: 'Login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        }).state('signup', {
          url: '/signup',
          title: 'Sign up',
          templateUrl: 'views/signup.html',
          controller: 'SignupCtrl'
        }).state('stats', {
          url: '/stats',
          title: 'Parking Stats',
          templateUrl: 'views/stats.html',
          controller: ''
        }).state('profile', {
          url: '/profile',
          title: 'Profile',
          templateUrl: 'views/profile.html',
          controller: ''
        });

        var isCordovaApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;

        if(isCordovaApp){
          $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
          });
        }else{
          $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
          });
        }

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
            $location.replace();
            $location.path('/login');
          }
        });
      });
    })

  .run([
    '$log', '$rootScope', '$window', '$state',
    function($log, $rootScope, $window, $state) {

      $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (toState.title) {
          $rootScope.pageTitle = toState.title;
        }
      });

      $rootScope.$on('$stateChangeSuccess', function() {
        // something else
      });

      $state.go('home');
    }
  ]);
