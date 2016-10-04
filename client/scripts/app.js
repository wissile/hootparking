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
      'config',
      'ngFileUpload'
    ])
    .config(function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
      //noinspection JSCheckFunctionSignatures

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('guide', {
          url: '/guide',
          title: 'Search Guide',
          templateUrl: 'views/search-guide.html'
        }).state('guide2', {
          url: '/guide2',
          title: 'Save Guide',
          templateUrl: 'views/save-guide.html'
        }).state('guide3', {
          url: '/guide3',
          title: 'Track Guide',
          templateUrl: 'views/track-guide.html'
        }).state('guide4', {
          url: '/guide4',
          title: 'Notification Guide',
          templateUrl: 'views/notification-guide.html'
        }).state('guide5', {
          url: '/guide5',
          title: 'Find Guide',
          templateUrl: 'views/find-guide.html'
        }).state('home', {
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
        }).state('new-user', {
          url: '/new-user',
          title: 'New User',
          templateUrl: 'views/new-user.html',
          controller: 'AccountCtrl',
          authenticate: true
        }).state('edit-account', {
           url: '/edit-account',
           title: 'Edit Account',
           templateUrl: 'views/edit-account.html',
           controller: 'EditAccountCtrl',
           authenticate: true
        }).state('notifications', {
          url: '/notifications',
          title: 'Notifications',
          templateUrl: 'views/notifications.html',
          controller: 'NotificationCtrl',
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
      }).state('Share', {
          url: '/Share',
          title: 'Share',
          templateUrl: 'views/Share.html',
          controller: 'shareCtrl'
      }).state('Aboutus', {
          url: '/Aboutus',
          title: 'About Us',
          templateUrl: 'views/About-Us.html',
          controller: ''
      }).state('Contact', {
          url: '/Contact',
          title: 'Contact Us',
          templateUrl: 'views/Contact-Us.html',
          controller: 'ContactUsCtrl'
      }).state('forgetPassword', {
          url: '/forget',
          title: 'Forget Password',
          templateUrl: 'views/forgetPassword.html',
          controller: 'ForgetPasswordCtrl'
      }).state('summary', {
          url: '/summary',
          title: 'Summary',
          templateUrl: 'views/summary.html',
          controller: 'SummaryCtrl'
      }).state('parkingspotslist', {
          url: '/parkingspotslist',
          title: 'Search Parking',
          templateUrl: 'views/parkingspotslist.html',
          controller: 'ParkingspotslistCtrl'
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

  .run(
    function($log, $rootScope, $window, $state, $location, Auth) {

      $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (toState.title) {
          $rootScope.pageTitle = toState.title;
        }
      });

      $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        // Redirect to login if route requires auth and you're not logged in
        Auth.isLoggedInAsync(function(loggedIn) {
          if (toState.authenticate && !loggedIn) {
            $location.replace();
            $state.go('login');
          }
        });
      });

      $state.go('home');
    }
  );
