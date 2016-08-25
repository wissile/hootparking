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
        var geocoder = new google.maps.Geocoder();

        function initialize(google) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (p) {

                    var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                    var mapOpt = {

                        //                      center: new google.maps.LatLng(51.508742, -0.120850),
                        center: LatLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOpt);
                    var marker = new google.maps.Marker({
                        position: LatLng,
                        map: map,
                        animation: google.maps.Animation.BOUNCE

                    });

                    geocoder.geocode({ 'latLng': LatLng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                $scope.formattedAddress = results[0].formatted_address;
                            }
                        }
                    });
                    //                    var input = document.getElementById('Autocomplete');
                    //                    var searchBox = new google.maps.places.SearchBox(input);
                    //                    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                    //                    map.addListener('bounds_changed', function () {
                    //                        searchBox.setBounds(map.getBounds());
                    //                    });

                    google.maps.event.addListener(marker, 'click', function (e) {
                        var infoWindow = new google.maps.InfoWindow();
                        infoWindow.setContent(marker.title);
                        infoWindow.open(map, marker);
                        console.log(e);
                    });
                });
            }
        }
        //  google.maps.event.addDomListener(window, 'load', initialize);

        initialize();

        $scope.writeAddressName = function (address) {


            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === window.google.maps.GeocoderStatus.OK) {
                    /*jshint camelcase: false */
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    console.log(latitude, longitude);
                    $scope.formattedAddress = results[0].formatted_address;

                    var LatLng = new google.maps.LatLng(latitude, longitude);
                    var mapOpt = {

                        //                      center: new google.maps.LatLng(51.508742, -0.120850),
                        center: LatLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOpt);
                    var marker = new google.maps.Marker({
                        position: LatLng,
                        map: map,
                        animation: google.maps.Animation.BOUNCE

                    });
                    console.log(marker);
                } else {
                    $scope.addressError = 'Unable to retrieve your address';
                }
                $scope.$digest();
            });
        };
        ParkingSpots.geolocateUser().then(function (latLng) {
            userLatLng = latLng;

        });

        ParkingSpots.initialize();

        $scope.calcRoute = ParkingSpots.calcRoute;

    });
