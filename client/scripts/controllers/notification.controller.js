'use strict';

angular.module('easyparkangularApp')
    .controller('NotificationCtrl', function ($scope, Auth, $http) {
        $scope.Sweep = true;
        $scope.appBackground = '#ede9e9';
        $scope.getCurrentUser = Auth.getCurrentUser();
        $scope.User = $scope.getCurrentUser;
        $http.get('/api/notification/' + $scope.User._id).success(function (data) {
            //return cb(); 
            $scope.notificationSetting = data[0];

        }).error(function (err) {      // jshint ignore:line
            //return cb(err); 
        });

        $scope.ShowSpendingBudget = function () {
            var abc = document.getElementById('SpendingBudget');
            if (abc.style.display !== 'none') {// jshint ignore:line
                abc.style.display = 'none';
            }
            else {
                abc.style.display = 'block';

            }
        };

        $scope.ShowReminder = function () {
            var abc = document.getElementById('SpendingReminder');
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

        $scope.SaveParkingReminder = function () {


        };

    });


