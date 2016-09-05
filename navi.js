var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var nodeArgs = process.argv;

/**
 * OMDB Functionality
 **/
 if (process.argv[2] === "movie-this") {
var movieName = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        movieName = movieName + "+" + nodeArgs[i];

    } else {

        movieName = movieName + nodeArgs[i];
    }
}

var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json';

request(queryUrl, function(error, response, body) {
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

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
// client.stream('statuses/filter', {track: 'twitter'},  function(stream) {
//   stream.on('data', function(tweet) {
//     console.log(tweet.text);
//   });
//
//   stream.on('error', function(error) {
//     console.log(error);
//   });
// });
//
// console.log(keys.twitterKeys);



// Make it so liri.js can take in one of the following commands:
//
//    * `my-tweets`
//
//    * `spotify-this-song`
//
//    * `movie-this`
//
//    * `do-what-it-says`