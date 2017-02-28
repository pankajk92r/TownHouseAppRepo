
'use strict';

var adminchatPanel = angular.module('adminchatPanel', []).
    controller("adminchatController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.adminchatModel = {};
        // when submitting the adminchat form, send the text to the node API
        $scope.init = function (adminchatModel) {
            debugger;
           // var iData = { Email: adminchatModel.adminchatId, Password: adminchatModel.userPassword };
            $http({
                method: 'GET',
                url: '/adminchat', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validateadminchat', { adminchatId: adminchatModel.adminchatId, userPassword: adminchatModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        adminchatModel.loginData = data.message;
                        adminchatModel.TableData = data.TableData;
                        $scope.adminchatModel= adminchatModel;
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
