'use strict';

angular.module('easyparkangularApp')
    .controller('ContactUsCtrl', function ($scope, Auth, $http) {

        $scope.feedback = '';
        $scope.compulsaryfield = false;
        // $scope.getCurrentUser = null;
        $scope.getCurrentUser = Auth.getCurrentUser();


        $scope.show_feedback_option = function () {// jshint ignore:line

            $scope.submitted = true;
            var abc = document.getElementById('textarea_sendfeedback');
            if (abc.style.display !== 'none') {// jshint ignore:line
                abc.style.display = 'none';
            }
            else {
                abc.style.display = 'block';

            }
        };

        $scope.SaveFeedback = function () {

            $scope.compulsaryfield = false;
            var datalist = encodeURIComponent(JSON.stringify({ id: $scope.getCurrentUser._id, feedback: $scope.feedback.feedbackData }));
            $http.post('/api/feedback/' + datalist).success(function (data) {// jshint ignore:line

                var abc = document.getElementById('textarea_sendfeedback');
                abc.style.display = 'none';
                $scope.compulsaryfield = true;

            });

        };

    });

   //  $http.put('/api/notification/' + datalist).success(function (data) {
            