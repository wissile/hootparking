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

      window.fbAsyncInit = function () {
          FB.init({
              appId: '1763685530568368',  //'1231500983547179', 
              status: true,
              cookie: true,
              xfbml: true,
              version: 'v2.7'
          });
      };

      (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      } (document, 'script', 'facebook-jssdk'));


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

      $scope.getMyLastName = function () {
          debugger;
          FB.getLoginStatus(function (response) {
              debugger;

              if (response.status === 'connected') {
                  console.log('Logged in.');
                  $scope.userID = response.authResponse.userID;
                  service.getMyLastName($scope.userID).then(function (response) {
                      debugger;
                      $location.path('/home');
                      //                        $scope.firstName = response.last_name; 
                      //                        $scope.first_name = response.first_name; 
                      //                        $scope.last_name = response.last_name; 
                      //                        $scope.email = response.email; 
                  });
              }
              else {

                  FB.login(function (responce) {
                      //   $location.path('/home'); 
                      FB.getLoginStatus(function (response) {
                          if (response.status === 'connected') {
                              alert("Login Successfully");
                          }
                      });
                      //catch closed 


                      //                   Auth.login({ 
                      //                    email: response.email, 
                      //                    password: $scope.user.password 
                      //                    }) 
                      //                    .then( function() { 
                      //                        // Logged in, redirect to home 
                      //                        $location.path('/home'); 
                      //                    }) 
                      //                    .catch( function(err) { 
                      //                    $scope.errors.other = err.message; 
                      //                    }); 

                  });


              }   //else closed 
          });
      };


  });



