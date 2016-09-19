'use strict';
//var app = angular.module('fileUpload', ['ngFileUpload']);
angular.module('easyparkangularApp')                           // jshint ignore:line
  .controller('AccountCtrl', function ($scope, Auth, $location, Upload, $window) {   // jshint ignore:line
      $scope.labelMobile = true;
      $scope.Work = true;
      $scope.FacebookImage = Auth.FacebookImageDisplay();
      $scope.getCurrentUser = Auth.getCurrentUser();
      $scope.appBackground = '#ffffff';
      // var date = $scope.getCurrentUser.dob;
      //      if (date)
      //          $scope.dob = $filter('date')(date, 'yyyy-MM-dd');
      $scope.User = $scope.getCurrentUser;
      $scope.logout = function () {
          Auth.logout();
      };
      //      $scope.uploadPic = function (file) 
      //      {
      //          debugger;
      //          Upload.upload({
      //              url: 'upload/url',
      //              data: { file: file }
      //          }).then(function (resp) {
      //              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      //          }, function (resp) {
      //              console.log('Error status: ' + resp.status);
      //          }, function (evt) {
      //              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      //              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      //          });
      //      };
     

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
              var dob = new Date($scope.User.dob);
              var datalistUser = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, dob: dob, password: $scope.User.password, email: $scope.User.email, facebook: fb }));
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



