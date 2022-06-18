const express = require("express");
const bodyParser = require("body-parser");

// This is a custom module defined in my project. It is accessed differently since
// it is local in my project.
const date = require(__dirname + "/date.js");

const app = express();
// Indicate to express that we want to use ejs as the view engine.
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// This is what happens:
// 1 - When the app is loaded, the app.get("/") block is executed and in it the res.render() function
// takes care of sending the list.ejs template to the browser. The template has two variables: kindOfDay and newListItems.
// kindOfDay is calculated in each app.get() execution. But newListItems is calculated differently.
// 2 - The list.ejs template has a form with an input and a button. Every time a new value is entered in the input above and
// the button is pressed, the app.post() block is executed. When that happens, the application ads a new item in the array of
// items and redirects the post to the root. At that point, app.get() is executed again and all the steps in 1 are executed.

// This items array is used to populate the item list in the UI (list.ejs).
const items = [];
const workItems = [];
// Respond to home with index.html
app.get("/", function(req, res) {

  // date() is running my function getDate defined in the custom module called date.js
  let day = date.getDate();
  // This code asumes that there is a list.ejs file in the views directory.
  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});


app.post("/", function(req, res) {

  let newItem = req.body.newItem;
  // Since we have two possible routes here (the root and work) and the form in the list.ejs only targets
  // the root, we need to understand from where the post is coming (from root or from work). The way we do
  // that is by detecting the value of the button called list in the list.ejs.
  if (req.body.list === "Work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    items.push(newItem);

    // This one is particularly tricky: as soon as we get the new item, we ask the response
    // to redirect to the root again. When this happens, a new item is present in the array and therefore
    // the newItem in res.render('list'... above is set.
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  // This code asumes that there is a list.ejs file in the views directory.
  res.render('list', {
    listTitle: "Work",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
