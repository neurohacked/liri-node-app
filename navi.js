/**
 * Variables
 **/
var fs = require('fs');
var twitter = require('twitter');
var keys = require('./keys.js');
var spotify = require('spotify');
var request = require('request');

var nodeArgs = process.argv;
var arg = "";
var action = process.argv[2];

/**
 * Capitalize first letter of query strings to fix undefinted queries
 **/
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Gather argument
 **/
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        arg = arg + "+" + nodeArgs[i].capitalizeFirstLetter();
    } else {
        arg = arg + nodeArgs[i].capitalizeFirstLetter();
    }
}

/**
 * Switch actions
 **/
switch (action) {
    case 'latest-tweets':
        twitterStream(arg);
        break;

    case 'spotify-this':
        spotifyTrack(arg);
        break;

    case 'movie-this':
        movieInfo(arg);
        break;

    case 'do-what-it-says':
        doIt();
        break;
}

/**
 * Twitter Functionality
 **/
function twitterStream(arg) {
    if (!arg) {
        arg = "neurohacked";
    }

    var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = {
        screen_name: arg
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        if (!error) {
            var tweetNum = 1;
            for (var i = 0; i < tweets.length; i++) {
                console.log('');
                console.log('==========================================');
                console.log('');
                console.log("Twitter Status #" + tweetNum + " : \n\n" + tweets[i].text);
                tweetNum++;
            }
            console.log('');
            console.log('==========================================');
            console.log('');
        }
    });
}

/**
 * Spotify Functionality
 **/
function spotifyTrack(arg) {
    if (!arg) {
        arg = "Ace of Base The Sign";
    }

    spotify.search({
        type: 'track',
        query: arg + '&limit=1&'
    }, function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        if (!error && data) {
            console.log('');
            console.log('==========================================');
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log('==========================================');
            console.log('');
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log('');
            console.log('==========================================');
            console.log('');
        }
    });
}

/**
 * OMDB Functionality
 **/
function movieInfo(arg) {
    if (!arg) {
        arg = "Mr.+Nobody";
    }

    var queryUrl = 'http://www.omdbapi.com/?t=' + arg + '&y=&plot=short&tomatoes=true&r=json';

    request(queryUrl, function(error, response, body) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        if (!error && response.statusCode == 200) {
            console.log('');
            console.log('==========================================');
            console.log("Movie: " + JSON.parse(body).Title);
            console.log('==========================================');
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
            console.log('==========================================');
            console.log('');
        }
    });
}

/**
 * Do What It Says Functionality
 **/
function doIt() {
    fs.readFile('random.txt', "utf8", function(error, data) {
        data = data.split(",");
        arg = data[1].replace(/"/g,'');
        if (data[0] === 'latest-tweets') {
            twitterStream(arg);
        } else if (data[0] === 'spotify-this') {
            spotifyTrack(arg);
        } else if (data[0] === 'movie-this') {
            movieInfo(arg);
        }
    });
}