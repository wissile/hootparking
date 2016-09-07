'use strict';

angular.module('easyparkangularApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window,$http) {
    $scope.user = {};
    $scope.errors = {};
//   
//     $http.post('/api/notification').success(function(data) 
//     { 
//       debugger; 
//          //return cb(); 
//        }).error(function(err) 
//        { 
//          //return cb(err); 
//          });
          

     $scope.login = function(form)
    {
    debugger;
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
        })
        .then( function() {
          //Logged in, redirect to home
          $location.path('/home');
        })
        .catch( function(err) 
        {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
