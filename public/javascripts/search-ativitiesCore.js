
'use strict';

var searchactivityPanel = angular.module('searchactivityPanel', []).
    controller("searchactivityController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.searchactivityModel = {};
        // when submitting the searchactivity form, send the text to the node API
        $scope.init = function (searchactivityModel) {
            debugger;
           // var iData = { Email: searchactivityModel.searchactivityId, Password: searchactivityModel.userPassword };
            $http({
                method: 'GET',
                url: '/searchactivity', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validatesearchactivity', { searchactivityId: searchactivityModel.searchactivityId, userPassword: searchactivityModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        searchactivityModel.loginData = data.message;
                        searchactivityModel.TableData = data.TableData;
                        $scope.searchactivityModel= searchactivityModel;
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
