
'use strict';

var categorysubmngmtPanel = angular.module('categorysubmngmtPanel', []);

categorysubmngmtPanel.directive("select2", function ($timeout, $parse) {
    return {
        restrict: 'AC',
        require: 'ngModel',
        link: function (scope, element, attrs) {
            console.log(attrs);
            $timeout(function () {
                element.select2();
                element.select2Initialized = true;
            });
            scope.$watch(attrs.ngModel, function () {
                //alert("hi");
            });


        }
    };
});

categorysubmngmtPanel.controller("categorysubmngmtController", function ($scope, $http, $location, $window, $timeout, $filter, $interval) {

    $scope.categorysubmngmtModel = {};
    $scope.categorysubmngmtModel.ChildCategoryName = "";
    $scope.categorysubmngmtModel.MainCategoryName = "";
    // when submitting the categorysubmngmt form, send the text to the node API
    $scope.init = function (categorysubmngmtModel) {

        // var iData = { Email: categorysubmngmtModel.categorysubmngmtId, Password: categorysubmngmtModel.userPassword };
        $http({
            method: 'GET',
            url: '/categorysubmngmt',
            headers: { 'Content-Type': 'application/json' }
        })
            // $http.get('/validatecategorysubmngmt', { categorysubmngmtId: categorysubmngmtModel.categorysubmngmtId, userPassword: categorysubmngmtModel.userPassword })
            .success(function (data) {

                if (data.error == false) {
                    categorysubmngmtModel.loginData = data.message;
                    categorysubmngmtModel.TableData = data.TableData;

                    categorysubmngmtModel.SubCategoryData = [];
                    angular.forEach(data.TableData, function (val, key) {

                        angular.forEach(val.ServiceProviderSubCat, function (v, i) {
                            categorysubmngmtModel.SubCategoryData.push(v);
                        })
                    });

                    $scope.categorysubmngmtModel = categorysubmngmtModel;
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
    $scope.Savecategory = function (Categorymodel) {
        var iData = { CategoryName: Categorymodel.CategoryName, SubCategoryName: Categorymodel.SubCategoryName };
        $http({
            method: 'POST',
            url: '/categorysubmngmt',
            data: iData,
            headers: { 'Content-Type': 'application/json' }
        })
            // $http.get('/validateLogin', { loginId: LoginModel.loginId, userPassword: LoginModel.userPassword })
            .success(function (data) {

                if (data.error == false) {
                    var mngmtModel = {};
                    $scope.init(mngmtModel);
                }
                else {
                    $scope.Categorymodel.errormessage = data.message;
                }
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    }
    $scope.modifyCategory = function (mMainCatModel, mChildCatModel, MainCatModel, ChildCatModel) {
        debugger;
        if (typeof (mMainCatModel) == 'undefined' || mMainCatModel == "") {
            //do nothing
        }
        else {
            //Update Main Category Name
            if (MainCatModel.CategoryName != mMainCatModel) //Checking if value is not same
            {
                
                var iData = { catid: MainCatModel.ServiceCatID, oldname: MainCatModel.CategoryName, modifiedName: mMainCatModel };
                $http({
                    method: 'POST',
                    url: '/UpdateMainCategory',
                    data: iData,
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {

                    if (data.error == false) {
                        var mngmtModel = {};
                        $scope.init(mngmtModel);
                        }
                        else {
                            $scope.Categorymodel.errormessage = data.message;
                        }
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
        }
        if (typeof (mChildCatModel) == 'undefined' || mChildCatModel == "") {
            //do nothing
        }
        else {
            //Update Child Category Name
            if (ChildCatModel.SubCategoryName != mChildCatModel) //Checking if value is not same
            {
                var iData = { catid: ChildCatModel.SubCatID, oldname: ChildCatModel.SubCategoryName, modifiedName: mChildCatModel };
                $http({
                    method: 'POST',
                    url: '/UpdateSubCategory',
                    data: iData,
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {

                    if (data.error == false) {
                          var mngmtModel = {};
                          $scope.init(mngmtModel);
                        }
                        else {
                            $scope.Categorymodel.errormessage = data.message;
                        }
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
        }


    }

})



