'use strict';
angular.module('easyparkangularApp')

  .controller('AccountCtrl', function ($scope, Auth, $location) {

      $scope.getCurrentUser = Auth.getCurrentUser();
      $scope.appBackground = "#ede9e9";
      var date = $scope.getCurrentUser.dob;
      if (date) {
          var numbers = date.match(/\d+/g);
          $scope.dob = new Date(numbers[2], numbers[0] - 1, numbers[1]);
      }
      $scope.User = $scope.getCurrentUser;
      $scope.logout = function () {
          Auth.logout();
      };
      $scope.SaveEditData = function (form) {
          $scope.submitted = true;
          var dob = new Date($scope.User.dob);
          var datalist = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, dob: dob, password: $scope.User.password, email: $scope.User.email }));

          Auth.updateUser(datalist, function (data) {
              // Logged in, redirect to home 
              $location.path('/account');
          });
      };
      $scope.fbLogin = function () {
          Auth.fbLogin1(function (data) {
              console.log(data);
              //Logged in, redirect to home 
              $location.path('/home');
          });
      };

      $scope.UserOfFacebook = function () {
          debugger;
          console.log($scope.getCurrentUser.id);
          window.open('https://www.facebook.com/' + $scope.getCurrentUser.id, '_system')
      };
  });



