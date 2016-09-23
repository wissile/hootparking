'use strict';

angular.module('easyparkangularApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window,$http,$cookieStore) {
    $scope.user = {};
    $scope.errors = {};
    $scope.compulsaryfield=false;
    $scope.errMessage=false;
     $scope.login = function(form){
    $scope.compulsaryfield=false;
      $scope.submitted = true;
       $scope.errMessage=false;
      if(form.$valid) {
        Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
        })
        .then( function(data) {
     
        $http.post('/api/notification/'+data.user._id).success(function(data) // jshint ignore:line
       { 
                //return cb(); 
        }).error(function(err) // jshint ignore:line
        { 
          //return cb(err); 
          });
          //Logged in, redirect to home
          
           $cookieStore.put('userlogin', true);
          $location.path('/home');

        })
        .catch( function(err) 
        {
          $scope.errors.other = err.message;
          $scope.errMessage=true;
        });
      }
      else{
      $scope.compulsaryfield=true;
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
