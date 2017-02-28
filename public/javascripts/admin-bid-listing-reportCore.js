
'use strict';

var adminbidlistPanel = angular.module('adminbidlistPanel', []).
    controller("adminbidlistController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.adminbidlistModel = {};
        // when submitting the adminbidlist form, send the text to the node API
        $scope.init = function (adminbidlistModel) {
            debugger;
           // var iData = { Email: adminbidlistModel.adminbidlistId, Password: adminbidlistModel.userPassword };
            $http({
                method: 'GET',
                url: '/adminbidlist', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validateadminbidlist', { adminbidlistId: adminbidlistModel.adminbidlistId, userPassword: adminbidlistModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        adminbidlistModel.loginData = data.message;
                        adminbidlistModel.TableData = data.TableData;
                        $scope.adminbidlistModel= adminbidlistModel;
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
