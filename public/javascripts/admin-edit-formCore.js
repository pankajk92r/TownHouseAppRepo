
'use strict';

var admineditformPanel = angular.module('admineditformPanel', []).
    controller("admineditformController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.admineditformModel = {};
        // when submitting the admineditform form, send the text to the node API
        $scope.init = function (admineditformModel) {
            debugger;
           // var iData = { Email: admineditformModel.admineditformId, Password: admineditformModel.userPassword };
            $http({
                method: 'GET',
                url: '/admineditform', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validateadmineditform', { admineditformId: admineditformModel.admineditformId, userPassword: admineditformModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        admineditformModel.loginData = data.message;
                        admineditformModel.TableData = data.TableData;
                        $scope.admineditformModel= admineditformModel;
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
