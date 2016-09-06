var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var nodeArgs = process.argv;

/**
 * Twitter Functionality
 **/
var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

if (process.argv[2] === "my-tweets") {
    var params = {
        screen_name: 'neurohacked'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var tweetNum = 1;
            for (var i = 0; i < tweets.length; i++) {
                console.log('');
                console.log('================================');
                console.log('');
                console.log("Twitter Status #" + tweetNum + " : \n\n" + tweets[i].text);
                tweetNum++;
            }
            console.log('');
            console.log('================================');
            console.log('');
        }
    });
}

/**
 * Spotify Functionality
 **/
if (process.argv[2] === "spotify-this-song") {
    if (process.argv[3]) {
        var trackName = "";
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                trackName = trackName + "+" + nodeArgs[i];
            } else {
                trackName = trackName + nodeArgs[i];
            }
        }
    } else {
        var trackName = 'ace+of+base+the+sign';
    }
    spotify.search({
        type: 'track',
        query: trackName + '&limit=1&'
    }, function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        if (!error && data) {
            console.log('');
            console.log('================================');
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log('================================');
            console.log('');
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log('');
            console.log('================================');
            console.log('');
        }
    });
}

/**
 * OMDB Functionality
 **/
if (process.argv[2] === "movie-this") {
    if (process.argv[3]) {
        var movieName = "";
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            } else {
                movieName = movieName + nodeArgs[i];
            }
        }
    } else {
        var movieName = "Mr.+Nobody";
    }

    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json';

    request(queryUrl, function(error, response, body) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        if (!error && response.statusCode == 200) {
            console.log('');
            console.log('================================');
            console.log("Movie: " + JSON.parse(body).Title);
            console.log('================================');
            console.log('');
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log('');
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log('');
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
            console.log('');
            console.log('================================');
            console.log('');
        }
    });

}

// Make it so liri.js can take in one of the following commands:
//
//    * `my-tweets`
//
//    * `spotify-this-song`
//
//    * `movie-this`
//
//    * `do-what-it-says`