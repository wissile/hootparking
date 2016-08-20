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
        data = ParkingSpots.setCurrentRate(data);
        $scope.spots = ParkingSpots.cleanName(data);
      });

      $scope.saveParkingSpot = function (spot) {
        console.log('spot', spot);
        var parkingSpot = {
          DESC: spot.DESC,
          INTER: spot.INTER,
          LOC: spot.LOC,
          NAME: spot.NAME
        };

        window.localStorage.setItem('parkingSpot', JSON.stringify(parkingSpot));
      };

    });
