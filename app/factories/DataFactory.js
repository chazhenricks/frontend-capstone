"use strict";

app.factory("DataFactory", function($q, $http, $window, FBCreds, BITCreds){


const addUser = function(newUser){
   return $q((resolve, reject)=>{
     console.log("adding new user to our database");
       $http.post(`${FBCreds.databaseURL}/users.json`, newUser)
       .then((response)=>{
           resolve(response);
       })
       .catch((error)=>{
           reject(error);
       });
   });
};

const getShows = function(artist){
    artist.name = artist.name.replace(/\s/g, '%20');
    return $q((resolve, reject)=>{
        $http.get(`${BITCreds.databaseURL}/artists/${artist.name}/events?app_id=shows_around`)
        .then((response)=>{
            var showsArray = response.data;
            showsArray.forEach((show)=>{
                if(show.venue.city === "Nashville"){
                    artist.city = show.venue.city;
                    artist.state = show.venue.region;
                    artist.venue = show.venue.name;
                    artist.tickets = show.offers[0].url;
                    artist.lat = show.venue.latitude;
                    artist.long = show.venue.longitude;

                    resolve(artist);
                }
            });
            // console.log("SHOWS RESPONSE", response);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};



return{
    addUser,
    getShows
    };

});
