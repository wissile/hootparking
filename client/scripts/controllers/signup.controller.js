'use strict';

angular.module('easyparkangularApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window,$http) {
    $scope.user = {};
    $scope.errors = {};
    $scope.errMessagesShow=false;
    $scope.compulsaryfield=false;
    $scope.errMessagesShow1=false;
   
    $scope.register = function(form) {
      $scope.errMessagesShow=false;
      $scope.errMessagesShow1=false;
      $scope.compulsaryfield=false;
      $scope.submitted = true;
   
      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(data) {
        $scope.errMessagesShow1=false;
        if(data.UserAvailable)
        {
        $scope.errMessagesShow1=true;
        $scope.errMessageUserExit='User Already Exist';
        }
        else{
          $location.path('/new-user');
       $http.post('/api/notification/'+data.user._id).success(function(data) 
       { 
          //return cb(); 
        }).error(function(err) 
        { 
          //return cb(err); 
          });
          }
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
      else{
      $scope.compulsaryfield=true;
      }
    };
    
    $scope.loginOauth = function(provider) { 
      $window.location.href = '/auth/' + provider; 
    }; 
 
    $scope.fbLogin = function () {  
    $scope.errMessagesShow=false;
       Auth.fbLogin1(function(data) { 
       if(data.err){
       $scope.errMessage=data.err.errors.email.message;
       $scope.errMessagesShow=true;
       }
       else{
       $location.path('/home'); //Logged in, redirect to home 
       }
        }); 
    }

  });



 

