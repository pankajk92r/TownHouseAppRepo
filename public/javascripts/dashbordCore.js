
'use strict';

var dashboardPanel = angular.module('dashboardPanel', []).
    controller("dashboardController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.dashboardModel = {};
        // when submitting the dashboard form, send the text to the node API
        $scope.init = function (dashboardModel) {
            debugger;
            // var iData = { Email: dashboardModel.dashboardId, Password: dashboardModel.userPassword };
            $http({
                method: 'GET',
                url: '/dashboard',
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validatedashboard', { dashboardId: dashboardModel.dashboardId, userPassword: dashboardModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false) {
                        dashboardModel.loginData = data.message;
                        dashboardModel.TableData = data.TableData;
                        $scope.dashboardModel = dashboardModel;
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
