"use strict";

var app = angular.module("ShowsAround", ["ngRoute", "LocalStorageModule", "spotify", "ui.materialize"]);

//initializes firebase
app.run(function($rootScope, $location, FBCreds, AuthFactory) {
    firebase.initializeApp(FBCreds);
});


//Will determine if a user is logged in or not. If not will redirect them back to the home page to log in
let isAuth = (AuthFactory) =>
    new Promise((resolve, reject) => {
        AuthFactory.isAuthenticated()
            .then((userExists) => {
                if (userExists) {
                    console.log('Authenicated, go ahead');
                    resolve();
                } else {
                    console.log('Authenticated reject, GO AWAY');
                    reject();
                }
            });
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
            controller: 'NavCtrl',
            resolve: { isAuth }
        })
        .when('/spotify', {
            templateUrl: 'partials/spotifylogin.html',
            controller: 'AuthCtrl',
            resolve: { isAuth }
        })
        .when('/showslist', {
            templateUrl: 'partials/shows-list.html',
            controller: "ShowsListCtrl",
            resolve: { isAuth }
        })
        .when('/trackedshows', {
            templateUrl: 'partials/trackedshows.html',
            controller: "TrackedShowsCtrl",
            resolve: { isAuth }
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
