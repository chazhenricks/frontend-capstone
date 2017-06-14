"use strict";

app.controller("NavCtrl", function($scope, $location, AuthFactory, DataFactory, LocationFactory, $timeout){

    $scope.newLocation = {
        zip:""
    };

    $scope.getZipCodeLocation = function(){
        LocationFactory.getCityByZip($scope.newLocation.zip)
        .then(()=>{
            $location.url('/showslist');
        });
    };

    $scope.showLocation = function(){
        console.log("Show Location", LocationFactory.getCurrentCity());
    };


    $scope.getCurrentLocation = function(){
        $scope.currentLocation = LocationFactory.getCoords();
        $timeout(()=>{
            LocationFactory.getCityByCoords($scope.currentLocation.lat, $scope.currentLocation.long)
            .then(()=>{
                $location.url('/showslist');
            });
        }, 5000);
    };

});
