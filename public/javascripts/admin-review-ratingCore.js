
'use strict';

var adminreviewratingPanel = angular.module('adminreviewratingPanel', []).
    controller("adminreviewratingController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

        $scope.adminreviewratingModel = {};
        // when submitting the adminreviewrating form, send the text to the node API
        $scope.init = function (adminreviewratingModel) {
            debugger;
           // var iData = { Email: adminreviewratingModel.adminreviewratingId, Password: adminreviewratingModel.userPassword };
            $http({
                method: 'GET',
                url: '/adminreviewrating', 
                headers: { 'Content-Type': 'application/json' }
            })
                // $http.get('/validateadminreviewrating', { adminreviewratingId: adminreviewratingModel.adminreviewratingId, userPassword: adminreviewratingModel.userPassword })
                .success(function (data) {
                    debugger;
                    if (data.error == false)
                    { 
                        adminreviewratingModel.loginData = data.message;
                        adminreviewratingModel.TableData = data.TableData;
                        $scope.adminreviewratingModel= adminreviewratingModel;
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
