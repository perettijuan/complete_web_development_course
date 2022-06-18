// This is a custom Node module used to calculate the date.


exports.getDate = function() {
  let today = new Date();

  // The usage of toLocaleDateString comes from https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
  // This options object is the format specification of how to show the date.
  let options = {
    weekday: "long", // show the full name
    day: "numeric",
    month: "long"
  }
  return today.toLocaleDateString("en-US", options);;
}

exports.getDay = function() {
  let today = new Date();

  // The usage of toLocaleDateString comes from https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
  // This options object is the format specification of how to show the date.
  let options = {
    weekday: "long"
  }
  return today.toLocaleDateString("en-US", options);
}
