'use strict';


angular.module('easyparkangularApp')
    .controller('SummaryCtrl', function ($scope, DateService, $interval) {

        $scope.appBackground = '#ffffff';
      function updateTime() {
        $scope.date = DateService.getDateTime();
      }

      var stopTime = $interval(updateTime, 1000);

      $scope.$on('$destroy', function () {
        // Make sure that the interval is destroyed too
        $interval.cancel(stopTime);
      });

    });
