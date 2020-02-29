var colors = [];
var pickedColor;
var num = 6;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var resetBtn = document.querySelector("#reset");
var btnModes = document.querySelectorAll(".mode");

init();

// FUNCTIONS

// initial game settings on start-up
function init() {
	// set event listeners for mode buttons
	setButtonEventListener();

	// set event listener for reset button
	resetBtn.addEventListener("click", reset);

	// adding event listeners to squares
	setSquareEventListener();

	reset();
}

// function to reset game
function reset() {
	// generate and add random colors
	colors = addRandomColors(num);
	// select random color as answer from the array of colors
	pickedColor = pickRandomColor();
	for (var i = 0; i < squares.length; i++) {
		// adding colors to squares
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	colorDisplay.textContent = pickedColor;
	message.textContent = "";
	resetBtn.textContent = "new colors";
}

// function to set squares event listeners
function setSquareEventListener() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			// getting value of clicked color
			var clickedColor = this.style.backgroundColor;
			// comparing clicked color to picked color and giving logic
			if (clickedColor === pickedColor) {
				changeColor(clickedColor);
				message.textContent = "Correct!";
				resetBtn.textContent = "play again";
			} else {
				this.style.backgroundColor = "white";
				message.textContent = "Try again";
			}
		});
	}
}

// function to set mode buttons event listeners
function setButtonEventListener() {
	for (var i = 0; i < btnModes.length; i++) {
		btnModes[i].addEventListener("click", function() {
			btnModes[0].classList.remove("selected");
			btnModes[1].classList.remove("selected");
			btnModes[2].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "easy") {
				num = 3;
			} else if (this.textContent === "medium") {
				num = 6;
			} else {
				num = 9;
			}
			reset();
		});
	}
}

// function to change all squares to clickedColor when correct
function changeColor(clickedColor) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = clickedColor;
	}
}

// function to pick random color from array of colors
function pickRandomColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// function to add random colors to array of colors
function addRandomColors(num) {
	var colorss = [];
	for (i = 0; i < num; i++) {
		colorss.push(generateRandomColors());
	}
	return colorss;
}

// function to generate random colors for the addRandomColors function
function generateRandomColors() {
	// red
	var r = Math.floor(Math.random() * 256);
	// green
	var g = Math.floor(Math.random() * 256);
	// blue
	var b = Math.floor(Math.random() * 256);
	// rgb()
	var colorString = "rgb(" + r + ", " + g + ", " + b + ")";
	return colorString;
}
