// With this command we "import" express
const express = require("express");
// With this command we "import" body-parser. Body-parser is a parser that allows
// to parse POST bodys with minimum effort.
const bodyParser = require("body-parser");

const app = express();
// In here, we're telling our server (app) to use body-parser with a particular mode:
// urlencoded. This mode is to retrieve the data that is being send in a form, like
// the one we have in our index.html file.
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Responds to the GET action on the home of the web app by sending an HTML file.
 */
app.get("/", function(req, res) {
  // sendFile is a function from Express.
  // __dirname is the name of the directory where the server is located. This is
  // particularly usefull to use relative paths.
  res.sendFile(__dirname + "/index.html");
});

/**
 * Responds to the POST verb in the home directory. This method will be executed
 * every time that the button that is in the form in index.html is pressed and
 * it will allow us to grab the data that is being posted. See index.html for details.
 */
app.post("/", function(req, res) {

  // Here we can access num1 and num2 because they are coming in the body of the request
  // and is being pre-processed by bodyParser. num1 and num2 are defined in the form in
  // index.html.
  // Take into consideration that the values are coming as text, that is why we're casting to Number
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var result = num1 + num2;
  res.send("The result of the calculation is = " + result);
});

app.listen(3000, function() {
  console.log("Server started at port 3000");
});
