"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, DataFactory, LocationFactory, $timeout){

    $scope.getZipCodeLocation = function(){

    };

    $scope.getCurrentLocation = function(){
        var currentLocation = LocationFactory.getCoords();
        $timeout(()=>{
            LocationFactory.getCityByCoords(currentLocation.lat, currentLocation.long)
            .then((response)=>{
                console.log(response.data.results[0].address_components[3].long_name);
            });
        }, 5000);
    };

});
