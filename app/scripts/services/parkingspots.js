'use strict';

/**
 * @ngdoc service
 * @name yeomanApp.ParkingSpots
 * @description
 * # ParkingSpots
 * Service in the yeomanApp.
 */
angular.module('easyparkangularApp')
    .service('ParkingSpots', function ParkingSpots($http, $q, $rootScope) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      var deferred = $q.defer();
      var spotsDeferred = $q.defer();

      //UTILITY FUNCTIONS FOR CALCULATE DISTANCE
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

      //GEOLOCATION SERVICES
      var userLatLng;

      var geotLocationSucces = function (position) {
        userLatLng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        deferred.resolve(userLatLng);
        // Write the formatted address
      };

      var geolocationError = function (positionError) {
        return 'Error: ' + positionError.message;
      };

      var geoLocation = function () {
        // If the browser supports the Geolocation API
        if (navigator.geolocation) {
          var positionOptions = {
            enableHighAccuracy: true,
            timeout: 10 * 1000 // 10 seconds
          };
          navigator.geolocation.getCurrentPosition(geotLocationSucces, geolocationError, positionOptions);
        }
        else {
          return 'Your browser doesn\'t support the Geolocation API';
        }
      };

      geoLocation();

      //MAP SEVICES
      var map;
      var directionsDisplay;
      var directionsService;
      var stepDisplay;
      var markerArray = [];

      var calculateRoute = function(){

      };

      //MAIN FUNCTIONS OF SERVICE
      var parkingSpots  = {
        getParkingSpots: function (lat, lon, radius, uom) {
          var spots;

          return $http({method: 'GET',
            url: '/sfpark/rest/availabilityservice?lat=' + lat +
                '&long=' + lon + '&radius=' + radius + '&uom=' + uom + '&response=json&pricing=yes'})
              .then(function (response) {
                if (typeof response.data === 'object' && response.data.AVL) {
                  spots = response.data.AVL;
                  spots = setDistances(lat, lon, spots);
                  return spots;
                } else {
                  // invalid response
                  return $q.reject(response.data);
                }

              }, function (response) {
                // something went wrong
                return $q.reject(response.data);
              });
        },

        geolocateUser: function () {
          return deferred.promise;
        },

        initialize: function () {
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
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                { lightness: 100 },
                { visibility: 'simplified' }
              ]
            },
            {
              featureType: 'road',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            },
            {
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
              style: window.google.maps.ZoomControlStyle.SMALL
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
        },

        calcRoute: function () {
          //calculateRoute();
          parkingSpots.geolocateUser().then(function(){
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
                directionsDisplay.setDirections(response);
                var latLng = response.routes[0].legs[0].end_location;
                var lat =latLng.k;
                var lon = latLng.B;
                var radius = 2;
                var uom = 'mile';
                parkingSpots.getParkingSpots(lat, lon, radius, uom)
                    .then(function(response){
                      spotsDeferred.resolve(response);
                      $rootScope.$broadcast('parkingSpot:updated',response);
                    });
              }
            });
          });
        },

        getSpots: function () {
          return spotsDeferred.promise;
        }
      };

      return parkingSpots;
    });
