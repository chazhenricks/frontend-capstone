"use strict";

app.factory("LocationFactory", function($timeout, $q, $http){

        var coords = {};
        var currentCity = "";

    let getCoords = function(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    coords.lat = position.coords.latitude;
                    coords.long = position.coords.longitude;
                });
            }
            return coords;
    };

    let newCity = function(city){
        currentCity = city;
    };

    let getCityByCoords = function(lat, long){
        return $q((resolve, reject)=>{
            $http.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true`)
            .then((response)=>{
            currentCity=(response.data.results[0].address_components[3].long_name);
            console.log("current city", currentCity);
            resolve(currentCity);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

    let getCurrentCity = function(){
        return currentCity;
    };


return {getCoords, getCityByCoords, getCurrentCity, newCity};

});
