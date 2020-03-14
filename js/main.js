var numSquares = 6;
var colors = generateRandomColors(numSquares);

var squares = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("colorDisplay");
var feedback = document.getElementById("feedback");
var header = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
var pickedColor = pickColor();
var gameOver = false;

//Return 1 random color
function randomColor() {
  return "rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ")";
}

//Push random colors to squares
function generateRandomColors(num) {
  var array = [];
  for (var i = 0; i < num; i++) {
    array.push(randomColor());
  }
  return array;
}

//Pick a random color and return it
function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

//Loop through squares and change their colors
function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    //Change backgroudn colors to the correct one
    squares[i].style.backgroundColor = color;
  }

  header.style.backgroundColor = color;
}

//Reset template to change colours, number of squares and all messages
function reset() {
  //generate all new Colors
  colors = generateRandomColors(numSquares);
  //pick new random color from array
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "";
    } else {
      squares[i].style.display = "none";
    }
  }

  //Change header color
  header.style.backgroundColor = "steelblue";
  //Change reset button text back
  resetButton.textContent = "New Colors";
  //Erase feedback
  feedback.textContent = "";
  //Change game over status
  gameOver = false;
}

//Change to display rgb value or color user will be guessing
colorDisplay.textContent = pickedColor;

//Loop through mode buttons to add event listeners
for (var i = 0; i < modeButtons.length; i++) {
  modeButtons[i].addEventListener("click", function(){
    //Remove "select" class from both buttons and add it to selected button
    modeButtons[0].classList.remove("selected");
    modeButtons[1].classList.remove("selected");
    this.classList.add("selected");

    this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
    reset();
  });
}

//Loop through all squares for all events and background color settings
for(var i = 0; i < squares.length; i++) {
  //Set square colors
  squares[i].style.backgroundColor = colors[i];

  //Click listeners for each square
  squares[i].addEventListener("click", function(){
    if (!gameOver) {
      var clickedColor = this.style.backgroundColor;
      //Compare clicked color to correct color
      if (clickedColor === pickedColor) {
        feedback.textContent = "Correct!";
        changeColors(clickedColor);
        resetButton.textContent = "Play Again?";
        gameOver = true;
      } else {
        this.style.backgroundColor = "#232323";
        feedback.textContent = "Try Again";
      }
    }
  });
}

resetButton.addEventListener("click", function(){
  reset();
});
