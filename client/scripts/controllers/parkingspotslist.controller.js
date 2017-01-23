'use strict';

/**
 * @ngdoc function
 * @name easyparkangularApp.controller:ParkingspotslistCtrl
 * @description
 * # ParkingspotslistCtrl
 * Controller of the easyparkangularApp
 */
angular.module('easyparkangularApp')
    .controller('ParkingspotslistCtrl', function ($scope, ParkingSpots, $http) {
        $scope.appBackground = '#ffffff';
        $scope.typeFilter = 'OFF';
        $scope.quantity = 8;
        $scope.orderProp = 'distance';
                $http.get('/parkingdata.json').then(function (msg) {
                    $scope.spots = msg.data.AVL;           
                });
        //        $http.get('/parkingdata.json', function (data) {
        //            debugger;
        //            data = data
        //            $scope.spots = data;
        //        });
        //      $scope.$on('parkingSpot:updated', function (event, data) {
        //            data = ParkingSpots.setCurrentRate(data);
        //            $scope.spots = ParkingSpots.cleanName(data);
        //        });

                $scope.saveParkingSpot = function (spot) {
                    $scope.submitted = true;
                    var abc = document.getElementById('textarea_sendfeedback');
                    if (abc.style.display !== 'none') {// jshint ignore:line
                        abc.style.display = 'none';
                    }
                    else {
                        abc.style.display = 'block';

                    }
            console.log('spot', spot);
            var parkingSpot = {
                DESC: spot.DESC,
                INTER: spot.INTER,
                LOC: spot.LOC,
                NAME: spot.NAME
            };

            window.localStorage.setItem('parkingSpot', JSON.stringify(parkingSpot));
        };

    });
