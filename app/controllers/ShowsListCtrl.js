"use strict";

app.controller("ShowsListCtrl", function($scope, AuthFactory, DataFactory, Spotify, $location, localStorageService){


let getTopArtists = ()=>{
    Spotify.getUserTopArtists({ limit: 50, time_range: "short_term" })
    .then(function (data) {
        $scope.artistArray = data.data.items;
      console.log($scope.artistArray);
    });
};




getTopArtists();


});
