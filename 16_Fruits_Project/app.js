// This is how you connect to MongoDB using the standard MongoDB driver.
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// const url = 'mongodb://127.0.0.1:27017';
//
// const dbName = 'fruitsDB';
//
// const client = new MongoClient(url);
//
// console.log("Here we go");
// client.connect(function(err){
//   console.log("Error detected " + err);
//   assert.equal(null, err);
//   console.log("Connected successfully");
//
//   const db = client.db(dbName);
//
//   client.close();
// });


const mongoose = require('mongoose');

const dbServer = 'mongodb://127.0.0.1:27017';
const dbName = "dbFruits"

mongoose.connect(dbServer + "/" + dbName);

//// SINGLE SAVE //////
// In order to save documents into the database, we need to follow these steps:
// 1 - First we define the schema that the document will have:
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
})


// 2 - Now we create the model based of the schema.
// mongoose.model() creates the model.
// parameters:
//  1st : the name of the schema. It always goes in singular, but mongoose will translate
//        that into a plural word.
//  2nd : the schema of the model.
const Fruit = mongoose.model("Fruit", fruitSchema);

// 3 - At this point we have everything we need to create the document to save:
const fruit = Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty good fruit."
});
// 4 - and finally, we are ready to save the document.
// Commented to avoid saving every time we run the project.
//fruit.save()

//// SAVING MANY DOCUMENTS AT THE SAME TIME //////
const kiwi = Fruit({
  name: "Kiwi",
  rating: 4,
  review: "Too sour for me."
});

const banana = Fruit({
  name: "Banana",
  rating: 3,
  review: "I don't like bananas."
});

const orange = Fruit({
  name: "Orange",
  rating: 6,
  review: "I like the juice."
});

// To save many at the same time, we use:
// Commented to avoid saving every time we run the project.
// Fruit.insertMany([kiwi, banana, orange], function(err) {
//   if (err) {
//     console.log("Something went wrong.");
//   } else {
//     console.log("Added new fruits");
//   }
// });



//// FINDING DOCUMENTS //////
// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//     // This is a good practice when working with dbs: always close the connection once no longer needed.
//     mongoose.connection.close();
//     fruits.forEach(function(fruit) {
//       console.log(fruit.name);
//     });
//   }
// });

//// UPDATING SINGLE DOCUMENT //////
// In this case I'm updating only one, but update has many flavors to update more than one.
// I'm going to update the Kiwi, that has an id of 62bc326b6283d86e401a5bb9
// Fruit.updateOne({
//   _id: "62bc326b6283d86e401a5bb9"
// }, {
//   review: "Kiwis are OK"
// }, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully updated the document");
//   }
// })

//// DELETE SINGLE DOCUMENT //////
// We can also use deleteMany()
// Fruit.deleteOne({
//   name: "Apple"
// }, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully deleted the documet");
//   }
// });


// Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema // Here we are establshing a relationship
});
// Model. This is interesting: when I named the model Person, MongoDB translates the collection name to plural as People
const Person = mongoose.model("Person", personSchema);
// Document
const person = Person({
  name: "Amy",
  age: 18,
  favoriteFruit: orange
});
// Save
//Commented to avoid saving every time we run the project.
person.save();
