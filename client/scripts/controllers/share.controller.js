'use strict';

angular.module('easyparkangularApp')                           // jshint ignore:line
  .controller('shareCtrl', function ($scope, Auth, $location) {   // jshint ignore:line
      //debugger;


      $scope.FbLikeUs = function () {
          Auth.fbLikeUsPage(function (response) {// jshint ignore:line
         //     console.log(data);
              //Logged in, redirect to home 
              window.open('https://www.facebook.com/HootParking-146602359081543/', '_system');

          });
      };



  });

