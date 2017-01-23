'use strict';
/**
 * Created by wissile on 12/16/14.
 */

angular.module('easyparkangularApp')
  .controller('MenuCtrl', function ($scope, $timeout, $mdSidenav, $cookieStore, Auth) {


      $scope.toggleLeft = function () {
          $mdSidenav('left').toggle();
      };
      $scope.getCurrentUser = Auth.getCurrentUser();
      if ($cookieStore.get('facebookNewImage')) {
          $scope.facebookNewImage = ($cookieStore.get('facebookNewImage'));
      }
      if ($cookieStore.get('facebookOldImage')) {
          $scope.facebookOldImage = ($cookieStore.get('facebookOldImage'));
      }

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
