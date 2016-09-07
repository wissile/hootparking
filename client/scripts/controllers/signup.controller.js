'use strict';

angular.module('easyparkangularApp')

//.config( function( $facebookProvider ) {
//  $facebookProvider.setAppId('912755438853265');
//})


//.run( function(  ) {
//  // Load the facebook SDK asynchronously
//  (function(){
//     // If we've already installed the SDK, we're done
//     if (document.getElementById('facebook-jssdk')) {return;}

//     // Get the first script element, which we'll use to find the parent node
//     var firstScriptElement = document.getElementsByTagName('script')[0];

//     // Create a new script element and set its id
//     var facebookJS = document.createElement('script'); 
//     facebookJS.id = 'facebook-jssdk';

//     // Set the new script's source to the source of the Facebook JS SDK
//     facebookJS.src = 'https://connect.facebook.net/en_US/all.js';

//     // Insert the Facebook JS SDK into the DOM
//     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
//   }());
//})

//;
 



//    $scope.getCurrentUser = Auth.getCurrentUser();

  .controller('SignupCtrl', function ($scope, Auth, $location, $window,$http) {
    $scope.user = {};
    $scope.errors = {};

    
    $scope.facebookLogin = function() {
     ///   debugger;
     //   alert("Hi");
    };

    $scope.register = function(form) {
      $scope.submitted = true;
     // var data = $scope.user;
   //   debugger;
      if(form.$valid) {
  //    debugger;
        Auth.createUser({
          name: $scope.user.name,
         // firstName: $scope.user.firstName,
        //  lastName: $scope.user.lastName,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(data) {
        debugger;
          // Account created, redirect to home
         //  $scope.getCurrentUser = getCurrentUser();       
          $location.path('/new-user');
       $http.post('/api/notification/'+data.user._id).success(function(data) 
       { 
         debugger; 
          //return cb(); 
        }).error(function(err) 
        { 
          //return cb(err); 
          });
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
//      debugger;
    };









 
//    $scope.isLoggedIn = false;
//  $scope.login = function() {
//    $facebook.login().then(function() {
//      refresh();
//    });
//  };
//  function refresh() {
//    $facebook.api('/me').then( 
//      function(response) {
//      var s=response;
//       alert(s); //$scope.welcomeMsg = 'Welcome ' + response.name;
//        $scope.isLoggedIn = true;
//      },
//      function(err) {
//     alert(err); //  $scope.welcomeMsg = 'Please log in';
//      });
//  }
  
 // refresh();

//    $scope.loginOauth = function(provider) {
//      $window.location.href = '/auth/' + provider;
//    };
$scope.loginOauth = function(provider) { 
      $window.location.href = '/auth/' + provider; 
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
 
                FB.login(function (responce){ 
                  //   $location.path('/home'); 
                 FB.getLoginStatus(function (response) {
                  if (response.status === 'connected') { 
                 alert("Login Successfully");
                 }
                 });
               

 
                }); 
 
                        
                }   //else closed 
            }); 
        }; 
  

  });



 

