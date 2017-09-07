# Shows Around

Shows around is a web app that utilizes the Spotify and BandsInTown APIs to provide a user with information of when their favorite artists are coming to their town. 

The app will allow you to log into your Spotify account, which it will then retreive a list of your most played artists. It will then take that list and run it through Ticketmaster's database of events, filter those events by city and provide you with a list of when and where your favorite bands are playing shows around you. 


## Getting Started 

If you wish to run this app locally on your machine, there are a few steps involved to make sure everything is talking and playing nicely; I'll walk you through those here. 

### Prerequisites
Heres as few things youll need to have installed on your system to get up and running. 

1. [npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm). To check if you have npm run `npm --version` in your terminal. If not, follow the link above for steps to install. 
2.  [http-server](https://www.npmjs.com/package/http-server). If you don't already have a local server, run `npm install http-server`. Once installed all you have to do is run `hs` in the root folder of the project to start hosting. You'll visit `localhost:8080`  in your broswer to see everything running. 



### Installing

1. Fork and clone the repo onto your machine
2. `cd` into the `/lib` folder and run `npm install` to download all the required dependencies. 
3. You will need to get an API key from Spotify in order to utilize the login feature. To do that:
    1. Visit [The Spotify Developer Website](https://developer.spotify.com/my-applications/#!/applications) and register your app with them  
    2. Once you've registered the app, make sure you register `http://localhost:8080/login.html` in the "Redirect-URIs" field inside the app or else you will get errors upon login. 
        1. Also note that if you choose to deploy this anywhere else besides your local host you will need to add that URL/path to the Spotify deloper page. So in addition to `http://localhost:8080/login.html`, you will also have `http://yourreallycoolwebsitename.com/login.html`
    1. In the `values/spotify-creds.js` file, re-populate the `SpotifyProvider.setClientId('');` field with your own clientID provided by spotify as well as the redirect URI, if different than the local host.
1. You will also need an API key and a firebase project in order to take advantage of the tracking shows feature. 
    1. Visit the [firebase website](https://firebase.google.com/) and follow the getting started instructions. 
    2. Once youve created a firebase project, head to the console (the url should look something like console.firebase.google.com/project/YOUR_PROJECTNAME) and click on the "Add Firebase To Your Web App" button. 1. Replace the values in the `app/values/fb-creds.js` file in this project with the values from firebase. 
    3. 
Thats it! You should be up and running. 


## Built With 
* [AngularJS](https://angularjs.org/) - Javascript Framework
* [Matarialize-CSS](http://materializecss.com/) - CSS Framework based on the material design principals created by Google. 
* [npm](https://www.npmjs.com/) - Javascript Package Manager. 

## Acknowledgments

* [Matt Hamil](https://github.com/matthamil/Brainify) - Large portions of dealing with Angular-Spotify were drawn from Matts capstone project. 
* [Eddie Moore](https://github.com/eddiemoore/angular-spotify#usage) - For creating an invaluable angular module that interacts with Spotify's API and saved me many headaches. 
* NSS Teaching staff - for finding my many missing semi-colons and typing errors. 

## Issues
If you find and bugs or issues, feel free to open up an issue on [github](https://github.com/chazhenricks/frontend-capstone/issues) or shoot me an email at chazhenricks@gmail.com. 















