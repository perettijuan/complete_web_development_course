const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
// Indicate to express that we want to use ejs as the view engine.
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
// Set public to be shared.
app.use(express.static("public"));

// Setup Database
const dbUrl = 'mongodb+srv://bumble-admin:test123@cluster0.oimwnxt.mongodb.net/todolistDB';
mongoose.connect(dbUrl);

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

// Schema used to store the custom lists.
const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("list", listSchema);


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

// Using Express Routing Parameters
app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  // Every time the user types a custom URL path, we create a new TODO list
  // with the name provided and default items in the DB.
  // First, we make sure that if the list already exists, we don't create a new one.
  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        // If the list doesn't exists, create one.
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // If the list exists, render the list ejs with the data found.
        res.render('list', {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });
});

// Handle the add buttom in the post
app.post("/", function(req, res) {
  let itemName = req.body.newItem;
  let listName = req.body.list;

  // Store the new item into the DB.
  const newItem = Item({
    name: itemName
  })

  if (listName === "Today") {
    // Save the item into the default collection.
    newItem.save();
    res.redirect("/");
  } else {
    // Save the item into the existing custom collection.
    List.findOne({
      name: listName
    }, function(err, foundList) {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

// Handle the delete post (performed when a checkbox is on)
app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    // Delete an item from the default list.
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        res.redirect("/");
      }
    });
  } else {
    // Delete an item from a custom TODO list:
    // In order to do this, we need to find the list document and delete an item from the
    // array that is part of that document.
    // Finding is simple, the complex part is to delete the item from the array:
    // to achieve that, we use findOneAndUpdate combined with the $pull operator from MongoDb
    List.findOneAndUpdate(
      {name: listName}, // Condition
      {$pull: {items: {_id: checkedItemId}}}, // Update value using $pull from MongoDB, details in class 348
      function(err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    )
  }
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
