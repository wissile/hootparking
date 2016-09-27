'use strict';

angular.module('easyparkangularApp')
    .controller('NotificationCtrl', function ($scope, Auth, $http) {
        $scope.Sweep = true;
        $scope.appBackground = '#ede9e9';
        $scope.getCurrentUser = Auth.getCurrentUser();
        $scope.User = $scope.getCurrentUser;
        $scope.sample = [{
            id: 1,
            name: 'AM'
        }, {
            id: 2,
            name: 'PM'
        }];
        $http.get('/api/notification/' + $scope.User._id).success(function (data) {
            //return cb(); 

            $scope.notificationSetting = data[0];
            var ParkingTimeReminder = $scope.notificationSetting.ParkingTimeReminder;
            if (ParkingTimeReminder) {
                var pt = ParkingTimeReminder.split(':');
                $scope.ParkingHrs = parseInt(pt[0]);
                $scope.ParkingMins = parseInt(pt[1]);
                $scope.ParkingToggleBtnVal = pt[2];
                if ($scope.ParkingToggleBtnVal === 'PM') {
                    $scope.selitem = $scope.sample[1];
                }
                if ($scope.ParkingToggleBtnVal === 'AM') {
                    $scope.selitem = $scope.sample[0];
                }
            }
        }).error(function (err) {// jshint ignore:line
            //return cb(err); 
        });

        $scope.getselectval = function () {

            $scope.selectedvalues = $scope.selitem.name;
        };
        $scope.ShowSpendingBudget = function () {
            var abc = document.getElementById('DivSpendingBudget');
            if (abc.style.display !== 'none') { // jshint ignore:line
                abc.style.display = 'none';
            }
            else {
                abc.style.display = 'block';

            }
        };

        $scope.ShowReminder = function () {
            var abc = document.getElementById('DivParkingReminder');
            if (abc.style.display !== 'none') {// jshint ignore:line
                abc.style.display = 'none';
            }
            else {
                abc.style.display = 'block';

            }
        };

        $scope.NotificationEvent = function (value, data) {

            var datalist = encodeURIComponent(JSON.stringify({ value: value, data: data, userId: $scope.User._id }));
            $http.put('/api/notification/' + datalist).success(function (data) {      // jshint ignore:line
                //return cb(); 
                //  $scope.notificationSetting = data;

            }).error(function (err) {     // jshint ignore:line
                //return cb(err); 
            });

        };

        $scope.SaveSpendingBudget = function (SpendingBudget) {
            var spendingBudgetValue = document.getElementById('txtSpendingBudget').value;
            var abc = document.getElementById('DivSpendingBudget');
            abc.style.display = 'none';

            var datalist = encodeURIComponent(JSON.stringify({ value: spendingBudgetValue, data: SpendingBudget, userId: $scope.User._id }));
            $http.put('/api/notification/' + datalist).success(function (data) {      // jshint ignore:line
                //return cb(); 
                //  $scope.notificationSetting = data;

            }).error(function (err) {     // jshint ignore:line
                //return cb(err); 
            });

        };

        $scope.SaveParkingReminder = function () {
            var hours = document.getElementById('hours').value;
            var min = document.getElementById('min').value;
            if (min && hours) {
                if (hours < 12 && hours > 1) {
                    if (min < 60 && min > 1) {
                        var content = $scope.selitem;
                        var ParkingTimeReminder = hours + ':' + min + ':' + content.name;
                        var abc = document.getElementById('DivParkingReminder');
                        abc.style.display = 'none';
                        var datalist = encodeURIComponent(JSON.stringify({ value: ParkingTimeReminder, data: 'ParkingTimeReminder', userId: $scope.User._id }));
                        $http.put('/api/notification/' + datalist).success(function (data) {      // jshint ignore:line
                            //return cb(); 
                            //  $scope.notificationSetting = data;


                        }).error(function (err) {     // jshint ignore:line
                            //return cb(err); 
                        });

                    };
                }

            }
        }

    });


//    .directive('startstop', function ($scope,$elem,$attrs) {
//        return {
//            restrict: 'C',
//            replace: true,
//            template: '<input type='button' id='btnToggleTime' value='AM' ng-value='ParkingToggleBtnVal' />',
//            link: function ($scope, $elem, $attrs) {
//                $elem.bind('click', function () {
//                    console.log('startstop clicked', $elem)
//                    if ($elem.val() == 'AM') {
//                        $elem.val('PM');
//                    }
//                    else {
//                        $elem.val('AM');
//                    }

//                })
//            }
//        }
//    });


