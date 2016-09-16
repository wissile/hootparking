'use strict';
//var app = angular.module('fileUpload', ['ngFileUpload']);
angular.module('easyparkangularApp')                           // jshint ignore:line
  .controller('AccountCtrl', function ($scope, Auth, $location, Upload) {   // jshint ignore:line
      $scope.labelMobile = true;
      $scope.Work = true;
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
      $scope.submit = function () { // jshint ignore:line

          if ($scope.file) { //check if from is valid 
              $scope.upload($scope.file); //call upload function 
          }
          else {
              $scope.SaveEditData();
          }
      };


      $scope.upload = function (file) {
          var id = $scope.getCurrentUser._id;
          Upload.upload({    // jshint ignore:line
              url: '/api/users/upload/' + id, //webAPI exposed to upload the file 
              data: { file: file} //pass file as data, should be user ng-model 
          }).then(function (resp) { //upload function returns a promise 

              if (resp.data.error_code === 0) {   // jshint ignore:line
                  $scope.submitted = true;
                  var dob = new Date($scope.User.dob);
                  var datalist = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, dob: dob, password: $scope.User.password, email: $scope.User.email, mobileno: $scope.User.mobileno, homeaddress: $scope.User.homeaddress, workaddress: $scope.User.workaddress, image: resp.data.Image }));

                  Auth.updateUser(datalist, function (data) {   // jshint ignore:line
                      // Logged in, redirect to home  
                      $location.path('/account');
                  });

              } else {
                  // $window.alert('an error occured'); 
              }
          }, function (resp) { //catch error 
              console.log('Error status: ' + resp.status);
              // $window.alert('Error status: ' + resp.status); 
          }, function (evt) {
              console.log(evt);
              //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 
              //nsole.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name); 
              // vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress 
          });
      };






      $scope.SaveEditData = function (form) {  // jshint ignore:line                           

          $scope.submitted = true;
         
          var datalist = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, password: $scope.User.password, email: $scope.User.email, mobileno: $scope.User.mobileno, homeaddress: $scope.User.homeaddress, workaddress: $scope.User.workaddress }));       // jshint ignore:line

          Auth.updateUser(datalist, function (data) {                       // jshint ignore:line
              // Logged in, redirect to home 
              $location.path('/account');
          });
      };

      $scope.fbLogin = function () {
          Auth.fbLogin1(function (data) {// jshint ignore:line
              console.log(data);
              //Logged in, redirect to home 
              $location.path('/home');
          });
      };
      $scope.EditButton = function () {
          $scope.label = 0;
          $scope.button = 1;
      };

      $scope.updateUser = function () {
          var datalist = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, dob: dob, password: $scope.User.password, email: $scope.User.email })); // jshint ignore:line

          Auth.updateUser(datalist, function (data) {                                // jshint ignore:line
              // Logged in, redirect to home 
              $location.path('/account');
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



