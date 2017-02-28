
'use strict';

var errorPanel = angular.module('errorPanel', []).
    controller("errorController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.errorModel = {};
        // when submitting the error form, send the text to the node API
        $scope.init = function (errorModel) {
            debugger;
           // var iData = { Email: errorModel.errorId, Password: errorModel.userPassword };
            $http({
                method: 'GET',
                url: '/error', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validateerror', { errorId: errorModel.errorId, userPassword: errorModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        errorModel.loginData = data.message;
                        errorModel.TableData = data.TableData;
                        $scope.errorModel= errorModel;
                    }
                    else {
                        $window.location.href = "/login";
                    }
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
    })
