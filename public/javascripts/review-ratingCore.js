
'use strict';

var reviewratingPanel = angular.module('reviewratingPanel', []).
    controller("reviewratingController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.reviewratingModel = {};
        // when submitting the reviewrating form, send the text to the node API
        $scope.init = function (reviewratingModel) {
            debugger;
           // var iData = { Email: reviewratingModel.reviewratingId, Password: reviewratingModel.userPassword };
            $http({
                method: 'GET',
                url: '/reviewrating', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validatereviewrating', { reviewratingId: reviewratingModel.reviewratingId, userPassword: reviewratingModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        reviewratingModel.loginData = data.message;
                        reviewratingModel.TableData = data.TableData;
                        $scope.reviewratingModel= reviewratingModel;
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
