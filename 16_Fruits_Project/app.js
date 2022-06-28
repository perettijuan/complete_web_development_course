const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017';

const dbName = 'fruitsDB';

const client = new MongoClient(url);

console.log("Here we go");
client.connect(function(err){
  console.log("Error detected " + err);
  assert.equal(null, err);
  console.log("Connected successfully");

  const db = client.db(dbName);

  client.close();
});
