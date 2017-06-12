"use strict";

var app = angular.module("ShowsAround", ["ngRoute", "LocalStorageModule", "spotify"]);


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
      templateUrl: 'partials/spotifylogin.html',
      controller: 'AuthCtrl'
    })
    .when('/showslist', {
       templateUrl: 'partials/shows-list.html',
       controller: "ShowsListCtrl"
    })
    .otherwise('/');


});




    // *******
    // SPOTIFY
    // *******

    // angular-spotify is an angularjs plugin that helps deal with iteracting with the spotify API. More info can be found at https://github.com/eddiemoore/angular-spotify#usage
app.config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('56e27aa1be0549c8a604ea4e23594fd1');
    SpotifyProvider.setRedirectUri('http://localhost:8080/login.html');
    SpotifyProvider.setScope('user-library-read user-top-read');
});


















