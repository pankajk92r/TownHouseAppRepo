
'use strict';

var admineditcostPanel = angular.module('admineditcostPanel', []).
    controller("admineditcostController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.admineditcostModel = {};
        // when submitting the admineditcost form, send the text to the node API
        $scope.init = function (admineditcostModel) {
            debugger;
           // var iData = { Email: admineditcostModel.admineditcostId, Password: admineditcostModel.userPassword };
            $http({
                method: 'GET',
                url: '/admineditcost', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validateadmineditcost', { admineditcostId: admineditcostModel.admineditcostId, userPassword: admineditcostModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        admineditcostModel.loginData = data.message;
                        admineditcostModel.TableData = data.TableData;
                        $scope.admineditcostModel= admineditcostModel;
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
