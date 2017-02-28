
'use strict';

var searchserviceproviderPanel = angular.module('searchserviceproviderPanel', []).
    controller("searchserviceproviderController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.searchserviceproviderModel = {};
        // when submitting the searchserviceprovider form, send the text to the node API
        $scope.init = function (searchserviceproviderModel) {
            debugger;
           // var iData = { Email: searchserviceproviderModel.searchserviceproviderId, Password: searchserviceproviderModel.userPassword };
            $http({
                method: 'GET',
                url: '/searchserviceprovider', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validatesearchserviceprovider', { searchserviceproviderId: searchserviceproviderModel.searchserviceproviderId, userPassword: searchserviceproviderModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        searchserviceproviderModel.loginData = data.message;
                        searchserviceproviderModel.TableData = data.TableData;
                        $scope.searchserviceproviderModel= searchserviceproviderModel;
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
