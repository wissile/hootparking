'use strict';
//var app = angular.module('fileUpload', ['ngFileUpload']);
angular.module('easyparkangularApp')                           // jshint ignore:line
  .controller('AccountCtrl', function ($scope, Auth, $location, Upload, $window, $cookieStore) {   // jshint ignore:line
      if ($cookieStore.get('reloadvalue')) {
          ($cookieStore.put('reloadvalue', false));
          $window.location.reload('/account');
      }
      $scope.labelMobile = true;
      $scope.Work = true;

      $scope.getCurrentUser = Auth.getCurrentUser();
      $scope.appBackground = '#ffffff';
      if ($scope.getCurrentUser.userType === 'Facebook') {
          if ($scope.getCurrentUser.image) {
              if ($scope.getCurrentUser.image.indexOf($scope.getCurrentUser._id) !== -1) {
                  $scope.facebookNewImage = $scope.getCurrentUser.image;
                  $cookieStore.put('facebookNewImage', $scope.facebookNewImage);
              }
              else {
                  $scope.FacebookImage = $scope.getCurrentUser.image;
                  $cookieStore.put('facebookOldImage', $scope.FacebookImage);
              }
          }

      }
      // var date = $scope.getCurrentUser.dob;
      //      if (date)
      //          $scope.dob = $filter('date')(date, 'yyyy-MM-dd');
      $scope.User = $scope.getCurrentUser;
      $scope.logout = function () {
          $cookieStore.put('facebookNewImage', null);
          $cookieStore.put('facebookOldImage', null);
          $window.location.reload('/login');
          Auth.logout();

      };


      $scope.fbLogin = function () {
          Auth.fbLogin1(function (data) {// jshint ignore:line
              console.log(data);
              //Logged in, redirect to home 
              $location.path('/home');
          });
      };


      $scope.fbLoginUser = function () {
          Auth.fbLoginNewUser(function (data) {

              var fb = {};
              console.log(data);
              fb.id = data.id;
              fb.name = data.name;
              fb.email = data.email;
              $scope.User.facebook = fb;
              var datalistUser = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname,password:$scope.User.password,email: $scope.User.email, facebook: fb }));
              //Logged in, redirect to home 
              // $location.path('/home');
              Auth.updateUser(datalistUser, function (data) {   // jshint ignore:line                           
                  // Logged in, redirect to home 
                  $location.path('/account');
              });
          });
      };
      $scope.UserOfFacebook = function (UserId) {
          console.log($scope.getCurrentUser.id);
          window.open('https://www.facebook.com/' + UserId, '_system');
      };
  });



