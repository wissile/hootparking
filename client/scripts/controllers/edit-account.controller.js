'use strict';
angular.module('easyparkangularApp')
  .controller('EditAccountCtrl', function ($scope, Auth, $location, Upload, $cookieStore) {
      $scope.labelMobile = true;
      $scope.Work = true;
      $scope.getCurrentUser = Auth.getCurrentUser();
      $scope.User = $scope.getCurrentUser;
      if ($scope.getCurrentUser.userType === 'Facebook') {
          if ($scope.getCurrentUser.image) {
              if ($scope.getCurrentUser.image.indexOf($scope.getCurrentUser._id) !== -1) {
                  $scope.facebookNewImage = $scope.getCurrentUser.image;
                  $cookieStore.put('facebookNewImage', $scope.facebookNewImage);
              }
              else {
                  $scope.FacebookImage = $scope.getCurrentUser.image;
              }
          }
      }
      $scope.logout = function () {
          Auth.logout();
      };

      $scope.submit = function () { //function to call on form submit
          if ($scope.file) { //check if from is valid
              $scope.upload($scope.file); //call upload function
          }
          else {
              $scope.SaveEditData();
          }
      };

      $scope.upload = function (file) {
          var id = $scope.getCurrentUser._id;
          Upload.upload({// jshint ignore:line
              url: '/api/users/upload/' + id, //webAPI exposed to upload the file
              data: { file: file} //pass file as data, should be user ng-model
          }).then(function (resp) { //upload function returns a promise
             if (resp.data.error_code === 0) {// jshint ignore:line
                  $scope.submitted = true;
                  var datalist;
                  if ($scope.User.userType === 'Facebook') {
                      datalist = encodeURIComponent(JSON.stringify({ _id: $scope.User._id, id: $scope.User.id, name: $scope.User.name, lastname: $scope.User.lastname, password: $scope.User.password, email: $scope.User.email, mobileno: $scope.User.mobileno, homeaddress: $scope.User.homeaddress, workaddress: $scope.User.workaddress, image: resp.data.Image }));
                      Auth.updateFbUser(datalist, function (data) {// jshint ignore:line
                          // Logged in, redirect to home 
                          $cookieStore.put('reloadvalue', true);
                          $location.path('/account');
                      });
                  }
                  else {
                      datalist = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, password: $scope.User.password, email: $scope.User.email, mobileno: $scope.User.mobileno, homeaddress: $scope.User.homeaddress, workaddress: $scope.User.workaddress, image: resp.data.Image }));
                      Auth.updateUser(datalist, function (data) {// jshint ignore:line
                          // Logged in, redirect to home 
                          $cookieStore.put('reloadvalue', true);
                          $location.path('/account');
                      });

                  }

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

      $scope.SaveEditData = function () {

          $scope.submitted = true;

          var datalist;
          if ($scope.User.userType === 'Facebook') {
              datalist = encodeURIComponent(JSON.stringify({ _id: $scope.User._id, id: $scope.User.id, name: $scope.User.name, lastname: $scope.User.lastname, password: $scope.User.password, email: $scope.User.email, mobileno: $scope.User.mobileno, homeaddress: $scope.User.homeaddress, workaddress: $scope.User.workaddress, image: $scope.FacebookImage }));
              Auth.updateFbUser(datalist, function (data) {// jshint ignore:line
                  // Logged in, redirect to home 
                  $cookieStore.put('reloadvalue', true);
                  $location.path('/account');
              });
          }
          else {
              datalist = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, password: $scope.User.password, email: $scope.User.email, mobileno: $scope.User.mobileno, homeaddress: $scope.User.homeaddress, workaddress: $scope.User.workaddress }));
              Auth.updateUser(datalist, function (data) {// jshint ignore:line
                  // Logged in, redirect to home 
                  $cookieStore.put('reloadvalue', true);
                  $location.path('/account');
              });
          }

      };

      //      $scope.fbLogin = function () {
      //          Auth.fbLogin1(function (data) {
      //              console.log(data);
      //              //Logged in, redirect to home 
      //              $location.path('/home');
      //          });
      //      };
      $scope.EditButton = function () {
          $scope.label = 0;
          $scope.button = 1;
      };

      $scope.updateUser = function () {
          var datalist = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, password: $scope.User.password, email: $scope.User.email }));

          Auth.updateUser(datalist, function (data) {// jshint ignore:line
              // Logged in, redirect to home 
              $location.path('/account');
          });
      };

      //      $scope.fbLoginUser = function () {
      //          Auth.fbLoginNewUser(function (data) {
      //              var fb = {};
      //              console.log(data);
      //              fb.id = data.id;
      //              fb.name = data.name;
      //              fb.email = data.email;
      //              $scope.User.facebook = fb;
      //              var dob = new Date($scope.User.dob);
      //              var datalistUser = encodeURIComponent(JSON.stringify({ id: $scope.User._id, name: $scope.User.name, lastname: $scope.User.lastname, dob: dob, password: $scope.User.password, email: $scope.User.email, facebook: fb }));
      //              //Logged in, redirect to home 
      //              // $location.path('/home');
      //              Auth.updateUser(datalistUser, function (data) {
      //                  // Logged in, redirect to home 
      //                  $location.path('/account');
      //              });
      //          });
      //      };
      //      $scope.UserOfFacebook = function (UserId) {
      //          console.log($scope.getCurrentUser.id);
      //          window.open('https://www.facebook.com/' + UserId, '_system')
      //      };
  });



