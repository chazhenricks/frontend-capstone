"use strict";

app.controller("ShowsListCtrl", function($scope, LocationFactory, AuthFactory, DataFactory, Spotify, $location, localStorageService) {


    $scope.fontsize = "below18";


    //Grabs either current location or user inout city from LocationFactory
    let city = LocationFactory.getCurrentCity();

    //Gets back the array of shows that match the specified city and parses the data into an object we can use to populate the page.
    let getArtistsShows = function(artists) {
        $scope.localShows = [];
        artists.forEach((item) => {
            DataFactory.getShows(item, city)
                .then((response) => {
                    var monthNum = response.datetime.slice(5, 7);
                    var mm = "";
                    //converts month numbers to words
                    switch (monthNum) {
                        case "01":
                            mm = "January";
                            break;
                        case "02":
                            mm = "February";
                            break;

                        case "03":
                            mm = "March";
                            break;

                        case "04":
                            mm = "April";
                            break;

                        case "05":
                            mm = "May";
                            break;

                        case "06":
                            mm = "June";
                            break;

                        case "07":
                            mm = "July";
                            break;

                        case "08":
                            mm = "August";
                            break;

                        case "09":
                            mm = "September";
                            break;

                        case "10":
                            mm = "October";
                            break;

                        case "11":
                            mm = "November";
                            break;

                        case "12":
                            mm = "December";
                            break;
                    }

                    var dd = response.datetime.slice(8, 10);
                    var yy = response.datetime.slice(0, 4);
                    var date = `${mm} ${dd}, ${yy}`;

                    //Converts 24hr time to 12hr time
                    var hr = response.datetime.slice(11, 13);
                    var min = response.datetime.slice(14, 16);
                    var time = "";
                    if (hr > 12) {
                        hr = hr - 12;
                        time = `${hr}:${min} PM`;
                    } else if (hr < 13) {
                        time = `${hr}:${min} AM`;
                    }


                    //removes %20 needed to represent spaces in the URL call for display purposes
                    response.name = response.name.replace(/%20/g, ' ');
                    response.monthNum = monthNum;
                    response.date = date;
                    response.time = time;

                    $scope.localShows.push(response);
                    console.log("localShows", $scope.localShows);
                }, (error) => {
                    console.error(error);
                });
        });
    };


    //Gets the last 50 top artists played within the last:
    // short_term: few weeks
    // medium_term: few months
    // long_term: few years

    let getTopArtists = () => {
        Spotify.getUserTopArtists({ limit: 50, time_range: "long_term" })
            .then(function(data) {
                var artists = [];
                var arrayFromSpotify = data.data.items;
                console.log(arrayFromSpotify);
                arrayFromSpotify.forEach(function(item) {
                    var artistData = {};
                    artistData.name = item.name;
                    if (item.images[0]) {
                        artistData.picture = item.images[0].url;
                    }
                    artists.push(artistData);
                });
                getArtistsShows(artists);
            });
    };


    //When user clicks to add show to their tracked list this will grab their firebase uid and attach it to the show object before it adds it to firebase
    $scope.addToTracked = function(show) {
        show.uid = AuthFactory.getUser();
        console.log(show);
        console.log(AuthFactory.getUser());
        DataFactory.addToTracked(show)
            .then((response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                });
    };







    //on partial load will run the getTopArtists function
    getTopArtists();


});
