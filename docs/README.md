# Shows Around

Shows around is a web app that utilizes the Spotify and Ticketmaster APIs to provide a user with information of when their favorite artists are coming to their town. 

The app will allow you to log into your Spotify account, which it will then retreive a list of your most played artists. It will then take that list and run it through Ticketmaster's database of events, filter those events by city and provide you with a list of when and where your favorite bands are playing shows around you. 


## Getting Started 

If you wish to run this app locally on your machine, there are a few steps involved to make sure everything is talking and playing nicely; I'll walk you through those here. 

1. Fork and clone the repo onto your machine
2. `cd` into the `/lib` folder and run `npm install` to download all the required dependencies
3. You will need to get an API key from Spotify in order to utilize the login feature. To do that:
    1. Visit [The Spotify Developer Website](https://developer.spotify.com/my-applications/#!/applications) and register your app with them  
    2. Once you've registered the app, make sure you register `http://localhost:8080/login.html` in the "Redirect-URIs" field inside the app or else you will get errors upon login. 
    1. In the `app/app.js` file, re-populate the `SpotifyProvider.setClientId('');` field with your own clientID provided by spotify. 
4. `cd` back to the root folder and, if you dont have it installed already, run `npm install http-server`. Once that is installed, or if you already have it installed, run `hs` to startup a local server. 
5. Visit `localhost:8080` in your browser and get goin!

