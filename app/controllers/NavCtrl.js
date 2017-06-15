"use strict";

app.controller("NavCtrl", function($scope, $location, AuthFactory, DataFactory, LocationFactory, $timeout, $route){

    $scope.newLocation = {
        city:""
    };

    $scope.isLoggedIn = false;

    firebase.auth().onAuthStateChanged(function (user) {
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

    $scope.newCity = function(){
        LocationFactory.newCity($scope.newLocation.city);
        $("#locationModal").modal('close');
        $location.url('/showslist');
    };

    $scope.reloadPage = function(){
        $route.reload();
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
