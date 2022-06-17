const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();


// In here we are making our public folder to be sent statically to the client in
// order to send images and css styles.
app.use(express.static("public"));

// Our app uses bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

// Respond to home with index.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// Handle the post of signup.
app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // NOTE: in here, I'm going to simulate an API request to send data over to Mailchimp.
  // The reason why I simulate it, is because the API has changed signifantly and you no longer
  // can access it with raw HTTPS

  // This is a JSON object that the Mailchimp API expects
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }
  // Transform the raw data to JSON.
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/517234";
  const options = {
    method: "POST",
    auth: "juan1:ca3350a7624209886639318651b0277d-us14"
  }

  // Currently, this is failling because the resource no longer exists. But this how
  // I would send data.
  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  });
  request.write(jsonData);
  request.end();

  console.log("First name " + firstName + "; Last Name: " + lastName + "; email: " + email);
});

// Adding a listener to the Try Again button in the failure.html page. This listener
// will re-direct the user to the home page.
app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});


// Mailchimp API Key ca3350a7624209886639318651b0277d-us14
// URL https://us14.api.mailchimp.com/3.0/lists
