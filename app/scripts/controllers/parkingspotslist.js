'use strict';

/**
 * @ngdoc function
 * @name easyparkangularApp.controller:ParkingspotslistCtrl
 * @description
 * # ParkingspotslistCtrl
 * Controller of the easyparkangularApp
 */
angular.module('easyparkangularApp')
    .controller('ParkingspotslistCtrl', function ($scope, ParkingSpots) {
      $scope.typeFilter = 'OFF';
      $scope.quantity = 8;
      $scope.orderProp = 'distance';

      $scope.$on('parkingSpot:updated', function (event, data) {
        $scope.spots = data;
      });

    });
