'use strict';
/**
 * @ngdoc function
 * @name easyparkangularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easyparkangularApp
 */
angular.module('easyparkangularApp')
    .controller('MainCtrl', function ($scope) {

        var map;
        var directionsDisplay;
        var directionsService;
        var stepDisplay;
        var markerArray = [];
        var userLatLng;

        $scope.result = '';
        $scope.options = null;
        $scope.details = '';

        new window.gnMenu(document.getElementById('gn-menu'));

        function geolocateUser() {
            // If the browser supports the Geolocation API
            if (navigator.geolocation) {
                var positionOptions = {
                    enableHighAccuracy: true,
                    timeout: 10 * 1000 // 10 seconds
                };
                navigator.geolocation.getCurrentPosition(getLocation, geolocationError, positionOptions);
            }
            else {
                $scope.addressError = 'Your browser doesn\'t support the Geolocation API';
            }
        }

        function getLocation(position) {
            userLatLng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // Write the formatted address
            writeAddressName(userLatLng);
        }

        function geolocationError(positionError) {
            $scope.addressError = 'Error: ' + positionError.message;
        }

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

        geolocateUser();

        function initialize() {
            // Instantiate a directions service.
            directionsService = new window.google.maps.DirectionsService();


            // Create an array to style the map
            var styles = [
                {
                    stylers: [
                        { hue: '#00ffe6' },//00ffe6   29ABE2
                        { saturation: -20 },
                        { lightness: 0 }
                    ]
                },{
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [
                        { lightness: 100 },
                        { visibility: 'simplified' }
                    ]
                },{
                    featureType: 'road',
                    elementType: 'labels',
                    stylers: [
                        { visibility: 'off' }
                    ]
                },{
                    featureType: 'landscape',
                        elementType: 'geometry',
                        stylers: [
                        { hue: '#FBB03B' },
                        { gamma: 1.4 },
                        { saturation: 82 },
                        { lightness: 20 }
                    ]
                }
            ];

            // Create a new StyledMapType object, passing it the array of styles,
            // as well as the name to be displayed on the map type control.
            var styledMap = new window.google.maps.StyledMapType(styles,
                {name: 'Styled Map'});


            // Create a map and center it on San Francisco.
            var sf = new window.google.maps.LatLng(37.774391, -122.417859);
            var mapOptions = {
                zoom: 13,
                center: sf,
                panControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                mapTypeControlOptions: {
                    mapTypeIds: [window.google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            };
            map = new window.google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            //Associate the styled map with the MapTypeId and set it to display.
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');

            var rendererOptions = {
                map: map
            };
            directionsDisplay = new window.google.maps.DirectionsRenderer(rendererOptions);

            // Instantiate an info window to hold step text.
            stepDisplay = new window.google.maps.InfoWindow();
        }

        $scope.calcRoute = function () {

            // First, remove any existing markers from the map.
            for (var i = 0; i < markerArray.length; i++) {
                markerArray[i].setMap(null);
            }

            // Now, clear the array itself.
            markerArray = [];

            // Retrieve the start and end locations and create
            // a DirectionsRequest using WALKING directions.

            var end = document.getElementById('Autocomplete').value + ', san francisco, ca';

            var request = {
                origin: userLatLng,
                destination: end,
                travelMode: window.google.maps.TravelMode.DRIVING // or WALKING
            };

            // Route the directions and pass the response to a
            // function to create markers for each step.
            directionsService.route(request, function (response, status) {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    var warnings = document.getElementById('warnings_panel');
                    warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
                    directionsDisplay.setDirections(response);
                }
            });
        };

        initialize();

    });
