// With this command we "import" express
const express = require("express");

const app = express();

/**
 * This describes what should happen when a browser performs a GET request to the
 * home directory of the server. The home is indicated by the "/".
 * The callback function will indicate the server what to do when the home is hit
 * by a GET request.
 * Params:
 * req is the request object.
 * res is the response object.
 */
app.get("/", function(req, res) {
  res.send("<h1>Hello sucker</h1>");
});

app.get("/contact", function(req, res) {
  res.send("Contact me at your discression");
});

app.get("/about", function(req, res) {
  res.send("I am Thanos and I rule the universe");
});

app.get("/hobbies", function(req, res) {
  res.send("I destroy worlds");
});


/**
 * Starts the server in the port 3000 and the function passed as parameter
 * is executed as callback.
 */
app.listen(3000, function() {
  console.log("Server started at port 3000");
});
