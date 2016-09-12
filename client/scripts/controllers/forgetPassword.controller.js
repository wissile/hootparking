'use strict';

angular.module('easyparkangularApp')
    .controller('ForgetPasswordCtrl', function ($scope, Auth) {

        $scope.forgetPassword = function (form) {
            if (form.$valid) {
                Auth.forgetPass($scope.Email, function (data) {
                    if (data == 'Facebook') {
                        $scope.errMessage = "User is Already registered using Facebook, Please login through Facebook.";
                        $scope.errMessageShow = true;
                    }
                    else if (data.userNotFound) {
                        $scope.errMessage = "User is not registered with hootparking.";
                        $scope.errMessageShow = true;
                    }
                    else {
                        $scope.emailSuccess = "Email is sent Successfully, Please check Email.";
                        $scope.emailSuccessShow = true;
                        $scope.Email = "";
                    }
                });
            }
            else {
                $scope.errMessage = "Email is invalid."
            }
        }
    });