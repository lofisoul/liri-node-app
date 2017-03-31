var twitterKeys = require('./keys.js').twitterKeys;
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var tw_consumer_key = twitterKeys.consumer_key;
var tw_consumer_secret = twitterKeys.consumer_secret;
var tw_access_token_key = twitterKeys.access_token_key;
var tw_access_token_secret = twitterKeys.access_token_secret;

//TWITTER GLOBAL VARS!
var client = new Twitter({
  consumer_key: tw_consumer_key,
  consumer_secret: tw_consumer_secret,
  access_token_key: tw_access_token_key,
  access_token_secret: tw_access_token_secret
});


//this is what the app is being told to grab
var action = process.argv[2];

switch (action)
{
   case 'my-tweets': liriTweets();
   break;

   case 'spotify-this-song': liriSpotify();
   break;

   case 'movie-this': liriMovies();
   break;

   case 'do-what-it-says': liriDo();
   break;

   default: whoopsies();
}

function whoopsies() {
  console.log('That is not a known command!')
}

function liriTweets() {
  var params = {screen_name: 'lofisoul', count: '20'};
  client.get('statuses/user_timeline', params, function(err, tweets, response) {
    if (err) {
      console.log(err);
    }
    // console.log(tweets[0]);
    for(i=0;i<20;i++) {
      console.log((i+1) + ') ' + tweets[i].text + '\nCreated: '+ tweets[i].created_at + '\n');
    }
  });
}

function liriSpotify() {
//grab all the command line args from node (going to subtract the first two) 0 = NODE 1 = FILE RUNNING 2 = COMMAND
var nodeArg = process.argv;

//create an empty string
var songName = '';

//loop thorugh array and build string
for (var i = 3; i < nodeArg.length; i ++) {
    songName += nodeArg[i] + ' ';
}

console.log(songName);

spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log('Artist: ' + data.tracks.items[0].artists[0].name + '\nSong: ' + data.tracks.items[0].name + '\nPreview Link: ' + data.tracks.items[0].preview_url + '\nFrom the Album: ' + data.tracks.items[0].album.name);
});

}

function liriMovies() {
//grab all the command line args from node (going to subtract the first two) 0 = NODE 1 = FILE RUNNING 2 = COMMAND
var nodeArg = process.argv;

//create an empty string
var movieName = '';

//loop thorugh array and build string
for (var i = 3; i < nodeArg.length; i ++) {
    movieName += nodeArg[i] + '+';
}

//Shave off the last +
movieName = movieName.substring(0, movieName.length - 1);


if (movieName === '') {
  request('http://www.omdbapi.com/?t=mr+nobody&tomatoes=true', function (error, response, body) {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
    }

    var movieObj = JSON.parse(body);
    console.log('You didn\'t type anything in! Here\'s some fun facts about Mr. Nobody!');
    console.log('Title: ' + movieObj.Title + '\nYear Release: ' + movieObj.Year + '\nIMDB Rating: ' + movieObj.imdbRating + '\nCountry: ' + movieObj.Country + '\nLanguage: ' + movieObj.Language + '\nPlot: ' + movieObj.Plot + '\nActors: ' + movieObj.Actors + '\nRotten Tomatoes Score: ' + movieObj.Ratings[1].Value + '\nRotten Tomatoes Score: ' + movieObj.tomatoURL);
  });
}

else {

request('http://www.omdbapi.com/?t='+movieName+ '&tomatoes=true', function (error, response, body) {
  if (error) {
    console.log('error:', error); // Print the error if one occurred
    }

  var movieObj = JSON.parse(body);
  console.log('Title: ' + movieObj.Title + '\nYear Release: ' + movieObj.Year + '\nIMDB Rating: ' + movieObj.imdbRating + '\nCountry: ' + movieObj.Country + '\nLanguage: ' + movieObj.Language + '\nPlot: ' + movieObj.Plot + '\nActors: ' + movieObj.Actors + '\nRotten Tomatoes Score: ' + movieObj.Ratings[1].Value + '\nRotten Tomatoes Score: ' + movieObj.tomatoURL);
});
}
}

function liriDo() {
//   Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
fs.readFile('random.txt','utf8',(err,data) => {
    if(err) {
        return console.log(err);
    }
    dataArr = data.split(',');
    var liriCall = dataArr[0];
    var searchTerm = dataArr[1];

});
}

//BONUS CREATE A LOG OF ALL OF THESE ITEMS!!!!
function liriLog() {

}
