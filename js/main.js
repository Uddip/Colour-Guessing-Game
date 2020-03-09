var numSquares = 6;
var colors = generateRandomColors(numSquares);

var squares = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("colorDisplay");
var feedback = document.getElementById("feedback");
var header = document.querySelector("h1");
var reset = document.getElementById("reset");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");
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

//Change to display rgb value or color user will be guessing
colorDisplay.textContent = pickedColor;

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
        reset.textContent = "Play Again?";
        gameOver = true;
      } else {
        this.style.backgroundColor = "#232323";
        feedback.textContent = "Try Again";
      }
    }
  });
}

reset.addEventListener("click", function(){
  //generate all new Colors
  colors = generateRandomColors(numSquares);
  //pick new random color from array
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
  //Change header color
  header.style.backgroundColor = "steelblue";
  //Change reset button text back
  reset.textContent = "New Colors";
  //Erase feedback
  feedback.textContent = "";
  //Change game over status
  gameOver = false;
});

easyBtn.addEventListener("click", function(){
  //Highlight selected diffuculty
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  //Generate new set of colours and pick one of the new colours
  numSquares = 3;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  //Loop through squares and display none for 3 of them
  for (var i = 0; i < squares.length; i++) {
      if (colors[i]) {
        squares[i].style.background = colors[i];
      } else {
        squares[i].style.display = "none";
      }
  }
});

hardBtn.addEventListener("click", function(){
  //Highlight selected diffuculty
  hardBtn.classList.add("selected");
  easyBtn.classList.remove("selected");
  //Generate new set of colours and pick one of the new colours
  numSquares = 6;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  //Loop through squares set new colours
  for (var i = 0; i < squares.length; i++) {
      squares[i].style.background = colors[i];
      squares[i].style.display = "";
  }
});
