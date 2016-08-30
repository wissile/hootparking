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
        var marker;
        function initialize() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (p) {

                    var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                    var mapOpt = {

                        //               center: new google.maps.LatLng(51.508742, -0.120850),
                        center: LatLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOpt);


                    // lat_lng.push(myLatlng);
                    marker = new google.maps.Marker({
                        position: LatLng,
                        map: map,
                        
                        animation: google.maps.Animation.DROP
                    });
                    google.maps.event.addListener(marker, 'click', function (e) {
                        var infoWindow = new google.maps.InfoWindow();
                        infoWindow.setContent(marker.title);
                        infoWindow.open(map, marker);
                        console.log(e);
                    });

                    geocoder.geocode({ 'latLng': LatLng }, function (results, status) {
                        if (status === window.google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                /*jshint camelcase: false */
                                $scope.formattedAddress = results[0].formatted_address;
                                $scope.$digest();
                            }
                        }
                    });
                    console.log(p);
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
                    var markers = [{ 'latitude': '18.508868', 'longitude': '73.789819' }, { 'title': 'Shinde Farm', 'latitude': '18.5088463', 'longitude': '73.789881'}];
                    // var LatLng = new google.maps.LatLng(latitude, longitude);
                    var LatLng = new google.maps.LatLng(markers[0].latitude, markers[0].longitude);
                    var mapOpt = {

                        //    center: new google.maps.LatLng(51.508742, -0.120850),
                        center: LatLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOpt);

                    for (var i = 0; i < markers.length; i++) {
                        var data = markers[i];
                        LatLng = new google.maps.LatLng(data.latitude, data.longitude);
                        marker = new google.maps.Marker({
                            position: LatLng,
                            map: map,
                            title: data.title,
                            animation: google.maps.Animation.DROP

                        });
                    }
                    google.maps.event.addListener(marker, 'click', function (e) {
                        var infoWindow = new google.maps.InfoWindow();
                        infoWindow.setContent(marker.title);
                        infoWindow.open(map, marker);
                        console.log(e);
                    });
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
