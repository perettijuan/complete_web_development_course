const express = require("express");
const bodyParser = require("body-parser");
// https is a standard node package, that comes for free. It is the native way in
// node to perform HTTP requests. There are more external packages that can be used.
const https = require("https");

const app = express();
// Our app uses bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

// Respond to home with index.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Here is where the magic happens.
// When the user enters text in the input on index.html and sends the form by pressing
// the button, this method responds.
app.post("/", function(req, res) {

  // Extract the user input. Here, movieName is the same name we used in the input form.
  const query = req.body.movieName;
  const apiKey = "eddf6980a6d7dadd72386f55f94ab571";
  const url = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + query + "&page=1&include_adult=false";

  // Here we are doing an API request to themoviedb to get the result of a search.
  // This is made using the standard HTTP requests module in node.
  https.get(url, function(apiResponse) {
    console.log(apiResponse.statusCode);

    // This is not part of the course: when I was doing exactly what the course was
    // doing, I was getting a Json error (Unexpected end of JSON input), because the
    // response was coming in multiple chunks. With this change, I made the application
    // to wait until the whole data has come (on end), but in the process I'm pushing
    // all the data that comes into a buffer called chunks.
    const chunks = [];
    apiResponse.on("data", function(data) {
      chunks.push(data);
    }).on('end', function() {
      // When the whole data has finished, I start processing it
      const data = Buffer.concat(chunks);
      const searchResults = JSON.parse(data);

      const firstMovie = searchResults.results[0];
      const originalTitle = firstMovie.original_title;
      const overview = firstMovie.overview;
      const releaseDate = firstMovie.release_date;
      const imageUrl = "https://image.tmdb.org/t/p/w500" + firstMovie.poster_path;
      res.write("<h1>The movie is " + originalTitle + "</h1>");
      res.write("<p>The overview is: " + overview + "</p>");
      res.write("<p>The release date is: " + releaseDate + "</p>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
})

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
