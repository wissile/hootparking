'use strict';

angular.module('easyparkangularApp')
  .controller('AccountCtrl', function ($scope, Auth) {

    //$scope.appBackground='#2b2f3d';

    $scope.getCurrentUser = Auth.getCurrentUser();


  });
