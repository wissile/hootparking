'use strict';
angular.module('easyparkangularApp')

  .controller('AccountCtrl', function ($scope, Auth, $location, $filter) {

      $scope.getCurrentUser = Auth.getCurrentUser();
      //$scope.appBackground = "#ede9e9";
      var date = $scope.getCurrentUser.dob;
      if (date)
      $scope.dob = $filter('date')(date, "yyyy-MM-dd");
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

      $scope.fbLoginUser = function () {
          Auth.fbLoginNewUser(function (data) {
               var fb = {};
              console.log(data);
              fb.id = data.id;
              fb.name = data.name;
              fb.email = data.email;
              $scope.User.facebook = fb;
              var dob = new Date($scope.User.dob);
              var datalistUser = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, dob: dob, password: $scope.User.password, email: $scope.User.email ,facebook:fb }));
              //Logged in, redirect to home 
              // $location.path('/home');
              Auth.updateUser(datalistUser, function (data) {
                  // Logged in, redirect to home 
                  $location.path('/account');
              });
          });
      };
      $scope.UserOfFacebook = function (UserId) {
          console.log($scope.getCurrentUser.id);
          window.open('https://www.facebook.com/' + UserId, '_system')
      };
  });



