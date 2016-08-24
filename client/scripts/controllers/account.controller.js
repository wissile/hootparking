'use strict';

angular.module('easyparkangularApp')
  .controller('AccountCtrl', function ($scope, Auth) {
      $scope.getCurrentUser = Auth.getCurrentUser();
      $scope.logout = function () {
          Auth.logout();
      };
  });
