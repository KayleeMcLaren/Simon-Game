//Variables to store button colours
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];  //Stores 
var userClickedPattern = [];

var started = false; //Keeps track of whether the game has started or not
var level = 0;  //Keeps track of game level

//Starts the game when a button has been pressed and the started variabled is set to false
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Checks when a button has been clicked and stores the ID of the button in userChosenColour
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);  // Add userChosenColour to userClickedPattern

  playSound(userChosenColour);  // Plays button sound
  animatePress(userChosenColour);  // Animate's chosen button

  checkAnswer(userClickedPattern.length-1);
});

// Checks the user's answer against the gamePattern
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();  // If the user's answer is correct, call nextSequence() after a 1000 milisecond delay
        }, 1000);
      }
    
      // If the user's answer is not correct, the game is over and will reset
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// Function to generate a new random number between 0 and 3 and store it in a varaible called randomNumber
function nextSequence() {
  userClickedPattern = [];
  level++;  //Increases the game level
  $("#level-title").text("Level " + level);  //Displays the updated game level to the user
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);  //Adds new random colour to gamePattern array

  // Selects the appropritate button colour using jQuery and animates the button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); // Calls the playSound function
}

// Animate the chosen colour button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");  // Adds the "pressed" class to the button using currentColour
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); 
  }, 100);  // Removes the "pressed" class after 100 miliseconds
}

//Plays the appropriate sound when called 
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Resets the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
