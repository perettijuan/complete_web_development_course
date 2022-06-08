// All possible colors in the game.
var buttonColors = ["red", "blue", "green", "yellow"];
// Holds the current pattern in the game.
var gamePattern = [];
// Holds the pattern that the user is clicking.
var userClickedPattern = [];
// Control whether the game has started or not.
var gameStarted = false;
// Holds the current level of the game.
var level = 0;

/**
 * Generates a random number between 0 and 3.
 * @return an integer value between 0 and 3.
 */
function randomNumber() {
  return Math.floor(Math.random() * (3 + 1));
}

function nextSequence(levelLabel) {
  var randomChosenColour = buttonColors[randomNumber()];
  gamePattern.push(randomChosenColour);
  $("#level-title").text("Level " + levelLabel);

  animateButton(randomChosenColour);
  playAudio(randomChosenColour);
}

/**
 * Function used to start the game. It tales the value selected randomly in
 * randomChosenColour and animates the first button along with the audio for
 * that button.
 */
function startGame() {
  $("body").removeClass("game-over");
  nextSequence(0);
}

/**
 * Plays the audio of the corresponding buttonId.
 * @param buttonId the id of the button that identifies the audio to play.
 */
function playAudio(buttonId) {
  var audio = new Audio("sounds/" + buttonId + ".mp3");
  audio.play();
}

/**
 * Auto-animates a button identified with buttonId by playing a fadeOut/fadeIn
 * animation.
 * @param buttonId the id of the button to animate.
 */
function animateButton(buttonId) {
  $("#" + buttonId).fadeOut(100).fadeIn(100);
}

/**
 * Performs the animation that takes place when a button is clicked. It sets
 * the custom "pressed" class and, after 100 milliseconds, it removes the class.
 * @param buttonId the id of the button to animate.
 */
function animatePress(buttonId) {
  var button = $("#" + buttonId);
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  var lastIndex = userClickedPattern.length - 1;
  if (gamePattern[lastIndex] === userClickedPattern[lastIndex]) {
    var colorChosen = userClickedPattern[lastIndex];
    playAudio(colorChosen);
    animatePress(colorChosen);
    level++;
    setTimeout(function() {
      nextSequence(level);
    }, 1000);
    console.log("success");
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game over, play any key to continue");
    gameStarted = false;
    console.log("wrong");
  }
}

/**
 * Add a listener to all buttons (all elements with class btn). When the button
 * is clicked, this function takes care of detecting the clicked element and
 * plays the proper sound and animation.
 */
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer();

  console.log(userClickedPattern);
});

/**
 * Adds a listener to detect the keypress event on any place of the web-page. When
 * a key is pressed, a new game is started only if a game was not started yet.
 */
$(document).keypress(function(event) {
  if (!gameStarted) {
    gameStarted = true;
    startGame();
  }
});
