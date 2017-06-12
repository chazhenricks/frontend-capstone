"use strict";

app.factory("DataFactory", function($q, $http, $window, FBCreds){


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



return{
    addUser
    };

});
