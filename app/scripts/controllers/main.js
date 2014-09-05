'use strict';
/**
 * @ngdoc function
 * @name easyparkangularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easyparkangularApp
 */
angular.module('easyparkangularApp')
    .controller('MainCtrl', function ($scope, ParkingSpots) {

      var userLatLng;

      $scope.result = '';
      $scope.options = null;
      $scope.details = '';

      new window.gnMenu(document.getElementById('gn-menu'));

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
        userLatLng = latLng;
        writeAddressName(latLng);
      });

      ParkingSpots.initialize();

      $scope.calcRoute = ParkingSpots.calcRoute;

    });
