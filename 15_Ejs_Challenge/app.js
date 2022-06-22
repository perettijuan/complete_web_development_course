//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// Set ejs as view engine to be able to render ejs.
app.set('view engine', 'ejs');
// Set the app to use body parser to parse post responses.
app.use(bodyParser.urlencoded({
  extended: true
}));
// Tell the app that our public folder should be statically shared.
app.use(express.static("public"));

// Stores all the posts
const posts = [];

// Start Home section
app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    currentPosts: posts
  });

});
// End Home section

// Start About section
app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});
// End About section

// Start Contact section
app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});
// End Contact section

// Start Compose section
app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }

  posts.push(post);
  res.redirect("/");
});
// End Compose section

// Start Individual Post Section
// This section uses Express Routing Parameters to have dinamyc routes:
// 1 - :postTitle is the parameter that comes in the request.
// 2 - Lodash is used to make that request parameter lower case.
// 3 - We iterate through the entire collection of posts we have so far.
// 4 - For each post, we lower-case the title.
// 5 - Compare the post title (lowerCase) with the request param (also lowerCase).
// 6 - When a match is found, we render the post body.
app.get("/posts/:postTitle", function(req, res) {

  // Here we are using Lodash to make sure that whatever it comes in the request, is lower-cased
  // in order to be able to do a perfect matching with the titles we have in our posts.
  const requestedTitle = _.lowerCase(req.params.postTitle);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle) {
        res.render("post", {
          postTitle: post.title,
          postBody: post.body
        });
    }
  });
});

// End Individual Post Section

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
