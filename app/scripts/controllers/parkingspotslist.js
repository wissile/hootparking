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

      var lat;
      var lon;
      var radius = 2;
      var uom = 'mile';

      ParkingSpots.getDestinationLatLon().then(function(latLng){
        var lat =latLng.B;
        var lon = latLng.k;
        ParkingSpots.getParkingSpots(lat, lon, radius, uom)
            .then(function(response){
              $scope.spots = response;

            });
      });


    });
