'use strict';

angular.module('easyparkangularApp')
  .controller('AccountCtrl', function ($scope, Auth) {

      //$scope.last_name = getCurrentUser.lastname;
      $scope.getCurrentUser = Auth.getCurrentUser();
      $scope.User = $scope.getCurrentUser;
      

      $scope.logout = function () {
          Auth.logout();
      };
//      $scope.SaveEditData = function () {

//          debugger;
//          Auth.updateUser({
//              //firstName: $scope.user.firstName,
//              lastname: $scope.User.lastname
//              // $scope.last_name = $scope.User.lastname;
//          })

//      };


      $scope.SaveEditData = function(form) {
      debugger;
      $scope.submitted = true;
       
        //var datalist = encodeURIComponent(JSON.stringify($scope.User));
        debugger;
        Auth.updateUser({
             lastname: $scope.User.lastname,
             // user: $scope.User
             dob: $scope.User.dob

            //user:datalist
        })
       

    };
  });



