"use strict";

var app = angular.module("App", ["ngRoute"]);


app.run(function($rootScope, $location, FBCreds, AuthFactory) {
  firebase.initializeApp(FBCreds);
});


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('', {
      templateUrl: '',
      controller: ''
    })
    .otherwise('/');
}]);
