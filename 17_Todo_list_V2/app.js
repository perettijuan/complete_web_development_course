const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
// Indicate to express that we want to use ejs as the view engine.
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
// Set public to be shared.
app.use(express.static("public"));

// Setup Database
const dbServer = 'mongodb://127.0.0.1:27017';
const dbName = "todolistDB"
mongoose.connect(dbServer + "/" + dbName);

const itemsSchema = {
  name: String
};
const Item = mongoose.model("item", itemsSchema);

// Hardcoding items in the DB to initialize
const item1 = Item({
  name: "Welcome to your TODO list."
});
const item2 = Item({
  name: "Hit the + button to add items."
});
const item3 = Item({
  name: "<-- Hit this to delete an item."
});
const defaultItems = [item1, item2, item3];

// Respond to home with index.html
app.get("/", function(req, res) {
  Item.find({}, function(err, dbItems) {
    if (err) {
      console.log(err);
    } else {
      if (dbItems.length === 0) {
        Item.insertMany(defaultItems, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Default items initialized");
          }
        });
        res.redirect("/");
      } else {
        res.render('list', {
          listTitle: "Today",
          newListItems: dbItems
        });
      }
    }
  });
});

// Handle the add buttom in the post
app.post("/", function(req, res) {
  let itemName = req.body.newItem;
  // Store the new item into the DB.
  const newItem = Item({
    name: itemName
  })
  newItem.save();
  res.redirect("/");
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
