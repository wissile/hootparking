'use strict';

/**
 * @ngdoc function
 * @name easyparkangularApp.controller:ParkingspotslistCtrl
 * @description
 * # ParkingspotslistCtrl
 * Controller of the easyparkangularApp
 */
angular.module('easyparkangularApp')
    .controller('ParkingspotslistCtrl', function ($scope, $http) {
      $scope.typeFilter = 'OFF';
      $scope.quantity = 8;
      $scope.orderProp = 'distance';

      var lat = 37.792275;
      var lon = -122.397089;
      var radius = 2;

      $http({method: 'GET',
        url: '/sfpark/rest/availabilityservice?lat=' + lat +
            '&long=' + lon + '&radius=' + radius + '&uom=mile&response=json&pricing=yes'}).
          success(function (data) {
            $scope.spots = setDistances(lat, lon, data.AVL);
          }).
          error(function () {
            console.log('error');
          });

      var deg2rad = function (deg) {
        return deg * (Math.PI / 180);
      };

      var kilometersToMiles = function (kilometers) {
        return kilometers * 0.62137;
      };

      var calcDistance = function (params) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(params.latDest - params.lat);  // deg2rad below
        var dLon = deg2rad(params.lonDest - params.lon);
        var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(params.lat)) * Math.cos(deg2rad(params.latDest)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return kilometersToMiles(d);
      };

      var setDistances = function (lat, lon, spots) {
        var location;
        var options;
        for (var i = 0; i < spots.length; i++) {
          location = spots[i].LOC.split(',');
          options = {
            lat: lat,
            lon: lon,
            latDest: parseFloat(location[1]),
            lonDest: parseFloat(location[0])
          };
          spots[i].distance = calcDistance(options);
        }
        return spots;
      };

    });
