"use strict";

app.factory("LocationFactory", function($timeout, $q, $http){

        var coords = {};

    let getCoords = function(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    coords.lat = position.coords.latitude;
                    coords.long = position.coords.longitude;
                });
            }
            return coords;

    };



    let getCityByCoords = function(lat, long){
        return $q((resolve, reject)=>{
            $http.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true`)
            .then((response)=>{
                resolve(response);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };




return {getCoords, getCityByCoords};

});
