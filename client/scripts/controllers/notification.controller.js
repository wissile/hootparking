'use strict';

angular.module('easyparkangularApp')
    .controller('NotificationCtrl', function ($scope, Auth, $http) {
        debugger;
        $scope.Sweep = true;
        $scope.getCurrentUser = Auth.getCurrentUser();
        $scope.User = $scope.getCurrentUser;
        $http.get('/api/notification/' + $scope.User._id).success(function (data) {
            debugger;
            //return cb(); 
            $scope.notificationSetting = data[0];

        }).error(function (err) {
            //return cb(err); 
        });

        $scope.NotificationEvent = function (value, data) {
            debugger;           
             var datalist = encodeURIComponent(JSON.stringify({ value: value, data: data, userId: $scope.User._id }));
            $http.put('/api/notification/' + datalist).success(function (data) {
                debugger;
                //return cb(); 
                //  $scope.notificationSetting = data;

            }).error(function (err) {
                //return cb(err); 
            });

        };

    });


