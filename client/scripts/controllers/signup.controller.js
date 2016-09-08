'use strict';

angular.module('easyparkangularApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window,$http) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;
   
      if(form.$valid) {
 
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(data) {
          $location.path('/new-user');
       $http.post('/api/notification/'+data.user._id).success(function(data) 
       { 
          //return cb(); 
        }).error(function(err) 
        { 
          //return cb(err); 
          });
        })
        .catch( function(err) {
         // err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
    
    $scope.loginOauth = function(provider) { 
      $window.location.href = '/auth/' + provider; 
    }; 
 
    $scope.fbLogin = function () {  
       Auth.fbLogin1(function(data) { 
          //Logged in, redirect to home 
          $location.path('/home'); 
        }); 
    }

  });



 

