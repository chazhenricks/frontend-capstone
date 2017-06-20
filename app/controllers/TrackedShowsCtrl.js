"use strict";

app.controller("TrackedShowsCtrl", function($scope, AuthFactory, DataFactory, Spotify, $location, localStorageService) {

    // sets up a blank array to keep track of the shows in a users profile
    $scope.localShows = [];


    //gets a list of users tracked shows from firebase and adds them to the local shows array
    $scope.getTrackedShows = function() {
        var user = AuthFactory.getUser();
        console.log("user", user);
        DataFactory.getTrackedShows(user)
            .then((response) => {
                $scope.localShows = response;
            });
    };

    // runs the remove show function with the specific show id
    $scope.removeShow = function(showId) {
        DataFactory.removeShow(showId)
            .then((response) => {
                console.log(response);
                $scope.getTrackedShows();
            });
    };

    // on partial load will run the getTrackedShows function
    $scope.getTrackedShows();

});
