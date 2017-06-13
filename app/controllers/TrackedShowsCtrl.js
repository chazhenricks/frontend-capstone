"use strict";

app.controller("TrackedShowsCtrl", function($scope, AuthFactory, DataFactory, Spotify, $location, localStorageService){

    $scope.localShows = [];

    $scope.getTrackedShows = function(){
        console.log("HAY");
        var user = AuthFactory.getUser();
        DataFactory.getTrackedShows(user)
        .then((response)=>{
            $scope.localShows = response;
        });
    };


    $scope.removeShow = function(showId){
        DataFactory.removeShow(showId)
        .then((response)=>{
            console.log(response);
            $scope.getTrackedShows();
        });
    };

$scope.getTrackedShows();

});
