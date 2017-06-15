"use strict";

app.factory("DataFactory", function($q, $http, $window, FBCreds, LocationFactory) {



    // Takes a users list of artist they entered and runs agains the bandsintown API and then filters by city and returns the matches
    const getShows = function(artist, city) {
        console.log("Current City", city);
        artist.name = artist.name.replace(/\s/g, '%20');
        return $q((resolve, reject) => {
            $http.get(`https://rest.bandsintown.com/artists/${artist.name}/events?app_id=shows_around`)
                .then((response) => {
                    var showsArray = response.data;
                    showsArray.forEach((show) => {
                        if (show.venue.city === city) {
                            artist.datetime = show.datetime;
                            artist.city = show.venue.city;
                            artist.state = show.venue.region;
                            artist.venue = show.venue.name;
                            artist.tickets = show.offers[0].url;
                            artist.lat = show.venue.latitude;
                            artist.long = show.venue.longitude;
                            resolve(artist);
                        }
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // deletes show from firebase based on the id of the object stored in firebase
    const removeShow = function(showId) {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/shows/${showId}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // take show object and adds it to firebase database
    const addToTracked = function(show) {
        return $q((resolve, reject) => {
            $http.post(`${FBCreds.databaseURL}/shows.json`, show)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // generates list of show objects from firebase based on uid
    const getTrackedShows = function(uid) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/shows.json?orderBy="uid"&equalTo="${uid}"`)
                .then((response) => {
                    var showsArray = [];
                    var listOfShows = response.data;
                    Object.keys(listOfShows).forEach((key) => {
                        listOfShows[key].id = key;
                        showsArray.push(listOfShows[key]);
                    });
                    resolve(showsArray);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };



    return {
        getShows,
        addToTracked,
        getTrackedShows,
        removeShow
    };

});
