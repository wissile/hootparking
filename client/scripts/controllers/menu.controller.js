'use strict';
/**
 * Created by wissile on 12/16/14.
 */

angular.module('easyparkangularApp')
  .controller('MenuCtrl', function ($scope, $timeout, $mdSidenav, Auth) {
      
      
      $scope.toggleLeft = function () {
          $mdSidenav('left').toggle();
      };
      $scope.getCurrentUser = Auth.getCurrentUser();
      if ($scope.getCurrentUser.userType === 'Facebook') {
          if ($scope.getCurrentUser.image) {
              if ($scope.getCurrentUser.image.indexOf($scope.getCurrentUser._id) !== -1) {
                 
                  $scope.facebookNewImage = $scope.getCurrentUser.image;
                  //$cookieStore.put('facebookNewImage', $scope.facebookNewImage);
              }
          }
      }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav) {
      $scope.close = function () {
          $mdSidenav('left').close();
      };
  });
