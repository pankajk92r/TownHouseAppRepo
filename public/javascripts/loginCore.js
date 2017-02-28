
'use strict';

var loginPanel = angular.module('loginPanel', []).
    controller("loginController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {
       
        $scope.LoginModel = {};  
    // when submitting the login form, send the text to the node API
        $scope.logMein = function (LoginModel) {
            debugger;
            var iData = { Email: LoginModel.Username, Password: LoginModel.userPassword };
            $http({
                method: 'POST',
                url: '/login',
                data: iData,
                headers: { 'Content-Type': 'application/json' }
            })
           // $http.get('/validateLogin', { loginId: LoginModel.loginId, userPassword: LoginModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false) {
                        $window.location.href = "/index";
                    }
                    else {
                        $scope.LoginModel.errormessage = "User name or password is not correct.";
                    }
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }; 
})
 