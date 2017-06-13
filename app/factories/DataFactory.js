"use strict";

app.factory("DataFactory", function($q, $http, $window, FBCreds, BITCreds){




const getShows = function(artist){
    artist.name = artist.name.replace(/\s/g, '%20');
    return $q((resolve, reject)=>{
        $http.get(`${BITCreds.databaseURL}/artists/${artist.name}/events?app_id=shows_around`)
        .then((response)=>{
            var showsArray = response.data;
            showsArray.forEach((show)=>{
                if(show.venue.city === "Nashville"){
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
            // console.log("SHOWS RESPONSE", response);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};

const removeShow = function(showId){
  return $q((resolve, reject)=>{
    $http.delete(`${FBCreds.databaseURL}/shows/${showId}.json`)
    .then((response)=>{
      resolve(response);
    })
    .catch((error)=>{
      reject(error);
    });
  });
};

const addToTracked = function(show){
  return $q((resolve,reject)=>{
    $http.post(`${FBCreds.databaseURL}/shows.json`, show)
    .then((response)=>{
      resolve(response);
    })
    .catch((error)=>{
      reject(error);
    });
  });
};


const getTrackedShows = function(uid){
  return $q((resolve, reject)=>{
    $http.get(`${FBCreds.databaseURL}/shows.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response)=>{
      var showsArray = [];
      var listOfShows = response.data;
      Object.keys(listOfShows).forEach((key)=>{
          listOfShows[key].id = key;
          showsArray.push(listOfShows[key]);
        });
      resolve(showsArray);
    })
    .catch((error)=>{
      reject(error);
    });
  });
};



return{
    getShows,
    addToTracked,
    getTrackedShows,
    removeShow
    };

});
