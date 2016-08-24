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
        var map;

        function initialize() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (p) {
                    var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                    var mapOpt = {
                        // center: new google.maps.LatLng(51.508742, -0.120850),
                        center: LatLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOpt);
                    var marker = new google.maps.Marker({
                        position: LatLng,
                        map: map
                        //title: "<div style = 'height:60px;width:200px'><b>Yourlocation:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
                    });
                    google.maps.event.addListener(marker, 'click', function (e) {
                        var infoWindow = new google.maps.InfoWindow();
                        infoWindow.setContent(marker.title);
                        infoWindow.open(map, marker);
                    });
                });
            }
        }
        google.maps.event.addDomListener(window, 'load', initialize);



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
