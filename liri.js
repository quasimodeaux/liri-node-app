var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var twitterKeys = require('./keys.js');
console.log(twitterKeys);
var spotifyKeys = require('./keys.js');
console.log(spotifyKeys);

var client = new Twitter(twitterKeys.twitterKeys);
var spotify = new Spotify(
     spotifyKeys.spotifyKey
);

var args = process.argv;

if (process.argv[2] === 'movie-this') {
    movieSearch();
}

if (process.argv[2] === 'my-tweets') {
    myTweets();
}

if (process.argv[2] === 'spotify-this-song') {
    spotifyThis();
}

if (process.argv[2] === 'do-what-it-says ') {
    runRandomTxt();
}




function movieSearch(){
    var userInput = "";
    for (var i = 3; i < args.length; i++){
        userInput = userInput + " " + args[i];
    }
    request("http://www.omdbapi.com/?t=" + userInput + "&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.stringify(body));
            console.log("Movie title is: " + JSON.parse(body).Title);
            console.log("Year movie was released: " + JSON.parse(body).Year);
            console.log("Imdb rating is: " + JSON.parse(body).imdbRating);
            console.log("Country movie was produced in: " + JSON.parse(body).Country);
            console.log("language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("URL: " + JSON.parse(body).Website);
        }
    });
};


function myTweets() {
    var params = {screen_name: 'quasiimo'};

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

            if (!error) {
                for (var i = tweets.length - 19; i < tweets.length; i++) {
                    var undefined;
                    if(undefined){
                        console.log("not enough tweets");
                    };
                console.log("Tweet Text: ", tweets[i].text)
                console.log("Created at: ", tweets[i].created_at);


                };
        };
    });

};



function runRandomTxt() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);


    });


function spotifyThis (){

    var userInput = "";
    for (var i = 3; i < args.length; i++){
        userInput = userInput + " " + args[i];
    }
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }


            // Do something with 'data'
        console.log("spotify this");
        console.log(data.tracks);

    });

};

