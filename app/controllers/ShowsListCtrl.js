"use strict";

app.controller("ShowsListCtrl", function($scope, AuthFactory, DataFactory, Spotify, $location, localStorageService){



let getArtistsShows = function(artists){
    $scope.localShows = [];
    artists.forEach((item)=>{
    DataFactory.getShows(item)
        .then((response)=>{
            response.name = response.name.replace(/%20/g, ' ');

            $scope.localShows.push(response);
        },(error)=>{
            console.log(error);
        });
    });
        console.log("localShows",$scope.localShows);
};


//Gets the last 50 top artists played within the last:
    // short_term: few weeks
    // medium_term: few months
    // long_term: few years

let getTopArtists = ()=>{
    Spotify.getUserTopArtists({ limit: 50, time_range: "medium_term" })
    .then(function (data) {
        var artists = [];
        var arrayFromSpotify = data.data.items;
        arrayFromSpotify.forEach(function(item){
            var artistData = {};
            artistData.name = item.name;
            artistData.picture = item.images[0].url;
            artists.push(artistData);
        });
        getArtistsShows(artists);
    });
};

getTopArtists();


});
