"use strict";

app.factory("AuthFactory", function($q, $http, $rootScope, FBCreds) {

// **********
// FIREBASE
// **********

  let currentUserData = null;
  //Firebase: Register a new user with email and password
  let registerWithEmail = (user) => {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .catch( function(error){
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("error:", errorCode, errorMessage);
    });
  };

  let login = (credentials) => {
    console.log(credentials);
    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    .catch( function(error){
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("error:", errorCode, errorMessage);
    });
  };

//Firebase: Return email, UID for user that is currently logged in.
  let getUser = () => {
    return currentUserData;
  };

// Kills browser cookie with firebase credentials
  let logout = () => {
    return firebase.auth().signOut();
  };

  let isAuthenticated = () => {
    return new Promise ( (resolve, reject) => {
      firebase.auth().onAuthStateChanged( (user) => {
        if (user){
          currentUserData = user.uid;
          console.log("user", user.uid);
          resolve(true);
        }else {
          resolve(false);
        }
      });
    });
  };

















  return {isAuthenticated, getUser, logout, registerWithEmail, login};
});
