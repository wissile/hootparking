'use strict';

angular.module('easyparkangularApp')
    .controller('NotificationCtrl', function ($scope, Auth, $http) {
        $scope.Sweep = true;
        $scope.appBackground = '#ede9e9';
        $scope.getCurrentUser = Auth.getCurrentUser();
        $scope.User = $scope.getCurrentUser;
        $http.get('/api/notification/' + $scope.User._id).success(function (data) {
            //return cb(); 
          //  debugger;
            $scope.notificationSetting = data[0];
            var ParkingTimeReminder = $scope.notificationSetting.ParkingTimeReminder;
            var pt = ParkingTimeReminder.split(' : ');
            $scope.ParkingHrs = pt[0];
            $scope.ParkingMins = pt[1];
            $scope.ParkingToggleBtnVal = pt[2];

        }).error(function (err) {      // jshint ignore:line
            //return cb(err); 
        });


        $scope.ShowSpendingBudget = function () {
            var abc = document.getElementById('DivSpendingBudget');
            if (abc.style.display !== 'none') {// jshint ignore:line
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


            var datalist = encodeURIComponent(JSON.stringify({ value: spendingBudgetValue, data: SpendingBudget, userId: $scope.User._id }));
            $http.put('/api/notification/' + datalist).success(function (data) {      // jshint ignore:line
                //return cb(); 
                //  $scope.notificationSetting = data;

            }).error(function (err) {     // jshint ignore:line
                //return cb(err); 
            });

        };

        $scope.SaveParkingReminder = function () {
            //            var hrs = document.getElementById('txthrs').value;
            //            var mins = document.getElementById('txtmins').value;
            //            var toggleTime = document.getElementById('btnToggleTime').value;

            //var ParkingTimeReminder = hrs + ' : ' + mins + ' : ' + toggleTime;
            var ParkingTimeReminder = document.getElementById('exampleInput').value + 'AM';
            var datalist = encodeURIComponent(JSON.stringify({ value: ParkingTimeReminder, data: 'ParkingTimeReminder', userId: $scope.User._id }));
            $http.put('/api/notification/' + datalist).success(function (data) {      // jshint ignore:line
                //return cb(); 
                //  $scope.notificationSetting = data;

            }).error(function (err) {     // jshint ignore:line
                //return cb(err); 
            });

        };

        //        $scope.ToggleTimingType = function () {
        //            debugger;
        //            var btnToggleTime1 = document.getElementById('btnToggleTime').value;
        //            if (btnToggleTime1 == 'AM') {
        //                btnToggleTime1.innerHTML = 'PM';
        //            }
        //            else {
        //                btnToggleTime1.innerHTML = 'AM';
        //            }


        //        };


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


