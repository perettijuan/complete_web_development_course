// Selects the h1 element and then adds it the css class big-title and the class margin-50
$("h1").addClass("big-title margin-50");

// Selects all the buttons on the screen and changes the text to "New Text"
$("button").text("New Text");

// Select the anchor tag and change the href attribute
$("a").attr("href", "https://yahoo.com")

// Selects the h1 element and adds a click listener. The function is executed when the click is detected.
$("h1").click(function() {
  $("h1").css("color", "purple");
});

// selects all the buttons on the screen and adds a click listener.
$("button").click(function() {
  // $("h1").show(); // shows the h1
  // $("h1").hide(); // hides the 1
  // $("h1").toggle(); // toggle between show and hide
  // $("h1").fadeOut(); // fade out animation
  // $("h1").fadeIn(); // fade in animation
  // $("h1").fadeToggle(); // toggle between fadeIn and fadeOut
  // $("h1").slideUp(); // Slide up the element
  // $("h1").slideDown(); // slide down the element
  $("h1").slideToggle(); // toggle the slide
});

// Selects the input element and adds a keypress listener.
$("input").keypress(function(event) {
  console.log(event.key);
});

// Adds a keypress event to the entire document and changes the text of the h1
$(document).keypress(function(event) {
  $("h1").text(event.key);
});

// Selects the h1 element and adds a listener to the mouseover event.
// This is an alternative to the keypress function.
$("h1").on("mouseover", function() {
  $("h1").css("color","green");
});
