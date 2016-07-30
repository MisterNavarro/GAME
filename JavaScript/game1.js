var gamePieces = 10;
var whosTurn = "true";
var human = { teamSize: 10, rock: 0, paper: 0, scissors: 0};
var computa = {teamSize: 10, rock: 0, paper: 0, scissors: 0};
var pawns = ["char1", "char2", "char3", "char4", "char5", "char6", "char7", "char8", "char9", "char10"];
//MY OBJECT CONSTRUCTOR 
function character(health, moves, attkrange, power) {
 this.healthbar = health;
 this.mobility = moves;
 this.range = attkrange;
 this.strength = power;
}
//MY ROCK OBJECT
function rock() {
 health: 100; mobility: 1; range: 4; power: 25; image: "url('levels/rock2') no-repeat center white";  
}
//MY PAPER OBJECT
function paper() { 
 health: 100; mobility: 4; range: 1; power: 25; image: "url('levels/paper2') no-repeat center white"; 
                 }
//MY SCISSORS OBJECT
function scissors() {
 health: 100; mobility: 2; range: 2; power: 25; image: "url('levels/scissors2.jpg') no-repeat center white";
}

//shows & hides the rules
function showRules() {
 var rules = document.getElementById("rules");
 //shows the rules
 if (rules.style.display === "none") {
  rules.style.display = "block";
 }
 //hides the rules
 else if (rules.style.display === "block") {
  rules.style.display = "none";
 }
}
//creates the board
function createBoard() {
 var trow = document.getElementsByTagName("tr");
 var tcell = document.getElementsByTagName("td");
 var board = document.getElementsByTagName("table")[0];
 var gamesize = 8;
  for (var i = 0; i < 4; i++) {
   board.appendChild(trow[i].cloneNode(true));
  }
 }
function loadGamePlayers() {
 //changes the border of the images.
 document.getElementById("characters").getElementsByTagName("img")[0].style.border = "3px solid black";
 document.getElementById("characters").getElementsByTagName("img")[1].style.border = "3px solid black";
 document.getElementById("characters").getElementsByTagName("img")[2].style.border = "3px solid black";
 //GETS THE TABLES
 var statustables = document.getElementById("status").getElementsByTagName("table");
 //GETS THE TABLE COUNTS
 var humanChars = statustables[0].getElementsByTagName("td");
 var compChars = statustables[1].getElementsByTagName("td");
 for (var zz = 0; zz < human.rock; zz++) {
  pawns[zz] = new character(rock.healthbar, rock.mobility, rock.power, rock.range);
  window.alert(pawns[zz]);
 }
}
//SHOWS WHICH SPOTS THEY CAN CHOOSE
function showAvailableSpots(checkIt) {
 //gets all the rows
  var pieceSelection = document.getElementById("boardgame").getElementsByTagName("tr");
 /*SHOWS YOU THE SELECTION FOR YOUR PIECES*/
 for (var ab = 0; ab < 5; ab++) {
  var square = pieceSelection[ab].getElementsByTagName("td");
  //gets the only squares you can choose from
  for (var ac = 0; ac < 3; ac++) {
   //checks to see if there are any images in the squares
   if (square[ac].style.backgroundImage === "") {
   var squares = square[ac];
    /*THIS SHOWS OR HIDES THE SELECTED SQUARES*/
    //if there is no image and its true then add yellow
    if (checkIt === "true") {
     square[ac].style.backgroundColor = "yellow";
    }
    //if there is no image but its false then remove color
    else {
     square[ac].style.backgroundColor = "";
    }
   }
   //else the background has an image
   else {
    square[ac].style.backgroundColor = "";
   }
  }
 }
}
function addGamePieces() {
  document.getElementById("messageBox").getElementsByTagName("p")[0].innerHTML = "Please Select " + gamePieces + " Characters you wish to play with.";
 var piece = this;
 var showIt = "false";
 var otherImages = document.getElementById("characters").getElementsByTagName("img");
 //checks to see if the selected piece wasn't already selected
 if (piece.style.border === "3px solid yellow") {
  //if not selected then make it red as selected and the rest as yellow
  for (var ax = 0; ax < 3; ax++) {
  otherImages[ax].style.border = "3px solid yellow";
  }
  piece.style.border = "3px solid red";
  showIt = "true";
  showAvailableSpots(showIt);
}
 //if image was already selected
 else if (piece.style.border === "3px solid red") {
  piece.style.border = "3px solid yellow";
  showIt = "false";
  showAvailableSpots(showIt);
 }
}
//Adds the image 
function squareSelection() {
 var chosenOne = this;
 var chosenImage; 
 //FINDS OUT WHICH IMAGE WAS SELECTED
 for (var cc = 0; cc < 3; cc++) {
  var findImage = document.getElementById("characters").getElementsByTagName("img");
   //Figures out which image is needed to add to the square
  if (findImage[cc].style.border === "3px solid red") {
   switch(cc) {
    case 0: {
     chosenImage = "url('levels/rock2') no-repeat center";     
     human.rock += 1;
     break;
    }
    case 1: {
     chosenImage = "url('levels/paper2') no-repeat center";
     human.paper += 1;
     break;
    }
    case 2: {
     chosenImage = "url('levels/scissors2.jpg') no-repeat center";
     human.scissors += 1;
     break;    
    }
   }
  }
  }
 //ADDS THE IMAGE TO THE SELECTED SQUARE & TO THE TABLE
 if (gamePieces > 0) {
  //ADDS THE GAME PIECE TO THE BOARD & TABLE
  if (chosenOne.style.backgroundColor === "yellow") {
   document.getElementById("status").getElementsByTagName("table")[0].style.visibility = "visible";
   var selectedA = document.getElementById("status").getElementsByTagName("table")[0].getElementsByTagName("td");
   selectedA[10 - gamePieces].style.background = chosenImage;
   selectedA[10 - gamePieces].style.backgroundSize = "contain";
   chosenOne.style.background = chosenImage;
   chosenOne.style.backgroundSize = "contain";
   gamePieces--;
  }
  //AFTER LAST SELECTED PIECE STARTS THE GAME
  if (gamePieces === 0) {
  var endIt = document.getElementById("boardgame").getElementsByTagName("td");
    //ERASES THE EXTRA SPOTS THEN LOADS GAME
   for (var dd = 0; dd < 60; dd++) {
    if (endIt[dd].style.backgroundColor === "yellow") {
     endIt[dd].style.backgroundColor = "";
    }
   }
   loadGamePlayers();
  }
   //loads up the computer pieces
 }
   document.getElementById("messageBox").getElementsByTagName("p")[0].innerHTML = "Please Select " + gamePieces + " Characters you wish to play with.";
}
//adds the events list
function createEventListeners() {
 //Navigation Buttons
 var navButtons = document.getElementById("nav").getElementsByTagName("li");
 //Reset Page
 if (navButtons[0].addEventListener) {
  navButtons[0].addEventListener("click", resetContent, false);
 }
 else if (navButtons[0].attachEvent) {
  navButtons[0].attachEvent("onclick", resetContent);
 }
 //Show Rules
  if (navButtons[1].addEventListener) {
  navButtons[1].addEventListener("click", showRules, false);
 }
 else if (navButtons[1].attachEvent) {
  navButtons[1].attachEvent("onclick", showRules);
 }
 var imgStart = document.getElementById("characters").getElementsByTagName("img");
  //adds the open choices
 if (imgStart[0].addEventListener) {
   for (var z = 0; z < 3; z++) {
   imgStart[z].addEventListener("click", addGamePieces, false);
   }
 }
 else if (imgStart[0].attachEvent) {
  for (var y = 0; y < 3; y++) {
  imgStart[y].attachEvent("onclick", addGamePieces);
  }
 }
 var squares = document.getElementById("boardgame").getElementsByTagName("td");
 //adds the game board clicks
 for (var bb = 0; bb < 60; bb++) {
  if (squares[bb].addEventListener) {
   squares[bb].addEventListener("click", squareSelection, false);
  }
  else if (square[bb].attachEvent) {
   squares[bb].attachEvent("onclick", squareSelection);
  }
 }
}
//hides all the features in the beginning of the game
function resetContent() {
 //hides the amount of players
 document.getElementById("status").getElementsByTagName("table")[0].style.visibility = "hidden";
 //hides the characters stats
 var charTable = document.getElementById("characters").getElementsByTagName("table");
 for (var a = 0; a < 3; a++) {
  charTable[a].style.visibility = "hidden";
 }
 //hides the upgrades and rules
 document.getElementById("upgrades").style.display = "none";
 document.getElementById("rules").style.display = "none";
 //adds content to the messagebox
 document.getElementById("messageBox").getElementsByTagName("p")[0].innerHTML = "Please Select " + gamePieces + " Characters you wish to play with.";
 var imgChars = document.getElementById("characters").getElementsByTagName("img");
 //adds the beggining selection 
 for (var b = 0; b < 3; b++) {
  imgChars[b].style.border = "3px solid yellow";
 }
}
function setUpPage() {
 createBoard();
 resetContent();
 createEventListeners();
 gamePieces = 10;
}
if (window.addEventListener) {
 window.addEventListener("load", setUpPage, false);
}
else if (window.attachEvent) {
 window.attachEvent("onload", setUpPage);
}