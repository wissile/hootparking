'use strict';
angular.module('easyparkangularApp')

  .controller('AccountCtrl', function ($scope, Auth, $location) {

      debugger;

      $scope.getCurrentUser = Auth.getCurrentUser();

      var date = $scope.getCurrentUser.dob;
      if (date != undefined) {
          var numbers = date.match(/\d+/g);
          $scope.dob = new Date(numbers[2], numbers[0] - 1, numbers[1]);
      }
      $scope.User = $scope.getCurrentUser;
      $scope.logout = function () {
          Auth.logout();
      };

      
      $scope.SaveEditData = function (form) {
          debugger;
          $scope.submitted = true;
          var dob = new Date($scope.User.dob);
          var datalist = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, dob: dob, password: $scope.User.password, email: $scope.User.email }));

          var x = Auth.updateUser(datalist)
          .then(function () {
              // Logged in, redirect to home 
              $location.path('/account');
          });

      };
      $scope.fbLogin = function () {
          Auth.fbLogin(function (data) {
              //Logged in, redirect to home 
              $location.path('/home');
          });
      }
      

  });



