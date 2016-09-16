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
        var geocoder = new google.maps.Geocoder();  // jshint ignore:line
       
        function initialize() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (p) {

                    var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude); // jshint ignore:line
                    var mapOpt = {

                        //                      center: new google.maps.LatLng(51.508742, -0.120850),
                        center: LatLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP // jshint ignore:line
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOpt); // jshint ignore:line
                    var marker = new google.maps.Marker({                                                               // jshint ignore:line
                        position: LatLng,
                        map: map,
                        animation: google.maps.Animation.BOUNCE // jshint ignore:line

                    });

                    geocoder.geocode({ 'latLng': LatLng }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {                                            // jshint ignore:line
                            if (results[0]) {
                                /*jshint camelcase: false */
                                $scope.formattedAddress = results[0].formatted_address;
                                $scope.$digest();
                            }
                        }
                    });
                    //                    var input = document.getElementById('Autocomplete');
                    //                    var searchBox = new google.maps.places.SearchBox(input);
                    //                    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                    //                    map.addListener('bounds_changed', function () {
                    //                        searchBox.setBounds(map.getBounds());
                    //                    });

                    google.maps.event.addListener(marker, 'click', function (e) {                  // jshint ignore:line 
                        var infoWindow = new google.maps.InfoWindow();                              // jshint ignore:line
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

                    var LatLng = new google.maps.LatLng(latitude, longitude);                       // jshint ignore:line
                    var mapOpt = {

                        //                      center: new google.maps.LatLng(51.508742, -0.120850),
                        center: LatLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP   // jshint ignore:line
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOpt); // jshint ignore:line
                    var marker = new google.maps.Marker({                                       // jshint ignore:line
                        position: LatLng,
                        map: map,
                        animation: google.maps.Animation.BOUNCE // jshint ignore:line

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
