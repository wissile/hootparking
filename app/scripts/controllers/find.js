'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:FindCtrl
 * @description
 * # FindCtrl
 * Controller of the yeomanApp
 */
angular.module('easyparkangularApp')
    .controller('FindCtrl', function ($scope, ParkingSpots) {

      $scope.carLocation = JSON.parse(window.localStorage.getItem("parkingSpot"));

      function writeAddressName(latLng) {
        var geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({
              'location': latLng
            },
            function (results, status) {
              if (status === window.google.maps.GeocoderStatus.OK) {
                /*jshint camelcase: false */
                $scope.formattedAddress = results[0].formatted_address;
              } else {
                $scope.addressError = 'Unable to retrieve your address';
              }
              $scope.$digest();
            });
      }

      ParkingSpots.geolocateUser().then(function (latLng) {
        writeAddressName(latLng);
      });

    });
