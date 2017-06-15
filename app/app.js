"use strict";

var app = angular.module("ShowsAround", ["ngRoute", "LocalStorageModule", "spotify", "ui.materialize"]);

//initializes firebase
app.run(function($rootScope, $location, FBCreds, AuthFactory) {
    firebase.initializeApp(FBCreds);
});


app.config(function($routeProvider) {
    // ********
    // ngRoute
    // ********

    // the routeProvider will help link partial URLS with their respective controllers
    // when the url ends with a specific path, ngRoute will load a certain URL partial that is controlled by a certain partial
    // these will be display in the <div ng-view></div> on the index.html.


    $routeProvider
        .when('/', {
            templateUrl: 'partials/firebaselogin.html',
            controller: 'AuthCtrl'
        })
        .when('/setlocation', {
            templateUrl: 'partials/setlocation.html',
            controller: 'NavCtrl'
        })
        .when('/spotify', {
            templateUrl: 'partials/spotifylogin.html',
            controller: 'AuthCtrl'
        })
        .when('/showslist', {
            templateUrl: 'partials/shows-list.html',
            controller: "ShowsListCtrl"
        })
        .when('/trackedshows', {
            templateUrl: 'partials/trackedshows.html',
            controller: "TrackedShowsCtrl"
        })
        .otherwise('/');


});




// *******
// SPOTIFY
// *******

// angular-spotify is an angularjs plugin that helps deal with iteracting with the spotify API. More info can be found at https://github.com/eddiemoore/angular-spotify#usage
app.config(function(SpotifyProvider, SpotifyCreds) {
    SpotifyProvider.setClientId(`${SpotifyCreds.ClientId}`);
    SpotifyProvider.setRedirectUri(`${SpotifyCreds.RedirectUri}`);
    SpotifyProvider.setScope(`${SpotifyCreds.Scope}`);
});
