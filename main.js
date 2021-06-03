var currPlayer = "ninja";
var winner;

var ninjaLabel = document.getElementById("p1");
var alienLabel = document.getElementById("p2");

var boxes = document.getElementsByClassName("grid-item");
var images = document.getElementsByTagName("img");

var row1 = document.getElementsByClassName("row1");
var row2 = document.getElementsByClassName("row2");
var row3 = document.getElementsByClassName("row3");

var col1 = document.getElementsByClassName("col1");
var col2 = document.getElementsByClassName("col2");
var col3 = document.getElementsByClassName("col3");

var diaL = document.getElementsByClassName("diaL");
var diaR = document.getElementsByClassName("diaR");

var ninjaBoxes = "";
var alienBoxes = "";

var ninjaScore = 0;
var alienScore = 0;

ninjaLabel.style.color = "white";

for(var i = 0; i < 9; i++) {
  var box = boxes[i];
  var image = images[i];
  box.addEventListener("click", placeImage);
  $(image[i]).hide();
}

function togglePlayer() {
  if(currPlayer == "ninja") {
    currPlayer = "alien";
    alienLabel.style.color = "white";
    ninjaLabel.style.color = "black";
  } else if(currPlayer == "alien") {
    currPlayer = "ninja";
    ninjaLabel.style.color = "white";
    alienLabel.style.color = "black";
  }
}

function checkForWinner() {
  // NINJA rows
       if (ninjaBoxes.includes("0") && ninjaBoxes.includes("1") && ninjaBoxes.includes("2")) { showWinner("ninja", row1); }
  else if (ninjaBoxes.includes("3") && ninjaBoxes.includes("4") && ninjaBoxes.includes("5")) { showWinner("ninja", row2); }
  else if (ninjaBoxes.includes("6") && ninjaBoxes.includes("7") && ninjaBoxes.includes("8")) { showWinner("ninja", row3); }

  // NINJA columns
  else if (ninjaBoxes.includes("0") && ninjaBoxes.includes("3") && ninjaBoxes.includes("6")) { showWinner("ninja", col1); }
  else if (ninjaBoxes.includes("1") && ninjaBoxes.includes("4") && ninjaBoxes.includes("7")) { showWinner("ninja", col2); }
  else if (ninjaBoxes.includes("2") && ninjaBoxes.includes("5") && ninjaBoxes.includes("8")) { showWinner("ninja", col3); }

  // NINJA diagonals
  else if (ninjaBoxes.includes("0") && ninjaBoxes.includes("4") && ninjaBoxes.includes("8")) { showWinner("ninja", diaL); }
  else if (ninjaBoxes.includes("2") && ninjaBoxes.includes("4") && ninjaBoxes.includes("6")) { showWinner("ninja", diaR); }

  // ALIEN rows
  else if (alienBoxes.includes("0") && alienBoxes.includes("1") && alienBoxes.includes("2")) { showWinner("alien", row1); }
  else if (alienBoxes.includes("3") && alienBoxes.includes("4") && alienBoxes.includes("5")) { showWinner("alien", row2); }
  else if (alienBoxes.includes("6") && alienBoxes.includes("7") && alienBoxes.includes("8")) { showWinner("alien", row3); }

  // ALIEN columns
  else if (alienBoxes.includes("0") && alienBoxes.includes("3") && alienBoxes.includes("6")) { showWinner("alien", col1); }
  else if (alienBoxes.includes("1") && alienBoxes.includes("4") && alienBoxes.includes("7")) { showWinner("alien", col2); }
  else if (alienBoxes.includes("2") && alienBoxes.includes("5") && alienBoxes.includes("8")) { showWinner("alien", col3); }

  // ALIEN diagonals
  else if (alienBoxes.includes("0") && alienBoxes.includes("4") && alienBoxes.includes("8")) { showWinner("alien", diaL); }
  else if (alienBoxes.includes("2") && alienBoxes.includes("4") && alienBoxes.includes("6")) { showWinner("alien", diaR); }
}

function placeImage(selected) {
  var selectedDoc = document.getElementById(selected);
  selectedImg = selectedDoc.getElementsByTagName("img");

  if(currPlayer == "ninja") {
      selectedImg[0].src = "ninjaHead.png";
      selectedImg[0].classList.add("ninja");
      $(selectedImg[0]).show();
      ninjaBoxes += selected;
  } else if (currPlayer == "alien") {
      selectedImg[0].src = "alien.png";
      selectedImg[0].classList.add("alien");
      $(selectedImg[0]).show();
      alienBoxes += selected;
  }
  checkForWinner();
  togglePlayer();
}

function showWinner(winner, line) {
  //"line" is a list of elements with certain class name (row1, col1, diaL, etc.)
  for(var i = 0; i < 3; i++) {
    var element = line[i];
    var searchClass = element.classList.item(i);
    console.log("Checking for class: " + searchClass);
  }
  if(winner == "ninja") {
    ninjaScore++;
    ninjaLabel.innerHTML = "Ninjas: " + ninjaScore;
    for(var i = 0; i < 3; i++) { line[i].style.background = "#3588b7"; }
    for(var i = 0; i < 9; i++) {
      //if image parent is not line, fadeOut
      var image = images[i];
      if($(image).parent().hasClass(line)) {
        $(image).fadeOut("slow");
      }
    }
  } else if(winner == "alien") {
    alienScore++;
    alienLabel.innerHTML = "Aliens: " + alienScore;
    for(var i = 0; i < 3; i++) { line[i].style.background = "#3588b7"; }
    for(var i = 0; i < 9; i++) {
      //if image parent is not line, fadeOut
      var image = images[i];
      if($(image).parent().hasClass(line)) {
        $(image).fadeOut("slow");
      }

    }
  }
}

function reset() {
  console.log("Reset button clicked.");
  resetGrid();

  ninjaScore = 0;
  alienScore = 0;

  ninjaLabel.innerHTML = "Ninjas: --";
  alienLabel.innerHTML = "Aliens: --";

  if(currPlayer != "ninja") {
    togglePlayer();
  }
}

function replay() { resetGrid(); }

function resetGrid() {
  for(var i = 0; i < 9; i++) {
    var image = images[i];
    var box = boxes[i];
    $(image).hide();
    image.classList.remove("alien");
    image.classList.remove("ninja");
    box.style.background = "#114e8a";
    ninjaBoxes = "";
    alienBoxes = "";
  }
}
