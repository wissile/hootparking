'use strict';

angular.module('easyparkangularApp')
  .controller('AccountCtrl', function ($scope, Auth, $location, $window) {

      //$scope.appBackground='#2b2f3d';

      $scope.getCurrentUser = Auth.getCurrentUser();

      $scope.logout = function () {
          Auth.logout();
      }
  });
