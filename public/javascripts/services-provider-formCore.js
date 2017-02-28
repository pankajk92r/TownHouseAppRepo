
'use strict';

var serviceproviderformPanel = angular.module('serviceproviderformPanel', []).
    controller("serviceproviderformController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.serviceproviderformModel = {};
        // when submitting the serviceproviderform form, send the text to the node API
        $scope.init = function (serviceproviderformModel) {
            debugger;
           // var iData = { Email: serviceproviderformModel.serviceproviderformId, Password: serviceproviderformModel.userPassword };
            $http({
                method: 'GET',
                url: '/serviceproviderform', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validateserviceproviderform', { serviceproviderformId: serviceproviderformModel.serviceproviderformId, userPassword: serviceproviderformModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        serviceproviderformModel.loginData = data.message;
                        serviceproviderformModel.TableData = data.TableData;
                        $scope.serviceproviderformModel= serviceproviderformModel;
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
