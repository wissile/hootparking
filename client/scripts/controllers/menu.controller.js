'use strict';
/**
 * Created by wissile on 12/16/14.
 */

angular.module('easyparkangularApp')
  .controller('MenuCtrl', function ($scope, $timeout, $mdSidenav, Auth) 
  {
      $scope.toggleLeft = function () 
    {
      $mdSidenav('left').toggle();
    };
    $scope.getCurrentUser = Auth.getCurrentUser();
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav) 
  {
      $scope.close = function () 
    {
      $mdSidenav('left').close();
    };
  });
