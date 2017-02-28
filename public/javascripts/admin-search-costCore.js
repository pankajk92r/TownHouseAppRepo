
'use strict';

var adminsearhcostPanel = angular.module('adminsearhcostPanel', []).
    controller("adminsearhcostController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.adminsearhcostModel = {};
        // when submitting the adminsearhcost form, send the text to the node API
        $scope.init = function (adminsearhcostModel) {
            debugger;
           // var iData = { Email: adminsearhcostModel.adminsearhcostId, Password: adminsearhcostModel.userPassword };
            $http({
                method: 'GET',
                url: '/adminsearhcost', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validateadminsearhcost', { adminsearhcostId: adminsearhcostModel.adminsearhcostId, userPassword: adminsearhcostModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        adminsearhcostModel.loginData = data.message;
                        adminsearhcostModel.TableData = data.TableData;
                        $scope.adminsearhcostModel= adminsearhcostModel;
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
