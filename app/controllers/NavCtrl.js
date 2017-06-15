"use strict";

app.controller("NavCtrl", function($scope, $location, AuthFactory, DataFactory, LocationFactory, $timeout, $route) {

    //When city other than current location is used, this stores that city name
    $scope.newLocation = {
        city: ""
    };

    //This determines if a user is logged in to trigger some ng-show elements in the navbar.html partial
    $scope.isLoggedIn = false;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.isLoggedIn = true;
            console.log("currentUser logged in", user, $scope.isLoggedIn);
            $scope.$apply();
        } else {
            $scope.isLoggedIn = false;
            console.log("currentUser logged in", $scope.isLoggedIn);
            $location.path("/");
        }
    });

    // if user enters new city this will change the city to search by in the Location Factory
    $scope.newCity = function() {
        LocationFactory.newCity($scope.newLocation.city);
        $("#locationModal").modal('close');
        $location.url('/showslist');
        $scope.newLocation.city = "";
    };


    $scope.reloadPage = function() {
        $route.reload();
    };

    $scope.showLocation = function() {
        console.log("Show Location", LocationFactory.getCurrentCity());
    };

    // triggers the LocationFactory to get the current city - since it is a javascript method and not a promise, need to use a timeout to make sure the browser has had enough time to gather the info before sending it to the getCityByCoords function
    $scope.getCurrentLocation = function() {
        $scope.currentLocation = LocationFactory.getCoords();
        $timeout(() => {
            LocationFactory.getCityByCoords($scope.currentLocation.lat, $scope.currentLocation.long)
                .then(() => {
                    $("#locationModal").modal('close');
                    $location.url('/showslist');
                    $route.reload();
                });
        }, 5000);
    };

});
